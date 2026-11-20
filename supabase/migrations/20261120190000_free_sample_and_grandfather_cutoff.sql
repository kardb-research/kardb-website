
-- KARDB: Free sample report and grandfather access cutoff
-- Cutoff is fixed on the first execution of this migration.

BEGIN;

-- 1. Store a permanent, singleton grandfather cutoff.
CREATE TABLE IF NOT EXISTS public.research_access_settings (
    id boolean PRIMARY KEY DEFAULT true CHECK (id = true),
    grandfather_cutoff_at timestamptz NOT NULL
);

INSERT INTO public.research_access_settings (id, grandfather_cutoff_at)
VALUES (true, clock_timestamp())
ON CONFLICT (id) DO NOTHING;

REVOKE ALL ON public.research_access_settings FROM PUBLIC, anon, authenticated;

-- 2. Create a separate table for free sample reports.
CREATE TABLE IF NOT EXISTS public.kardb_free_samples (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    storage_path text,
    status text NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'published', 'archived')),
    created_at timestamptz NOT NULL DEFAULT now(),
    published_at timestamptz
);

ALTER TABLE public.kardb_free_samples ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE
ON public.kardb_free_samples TO authenticated;

-- Published samples can be read by authenticated users.
CREATE POLICY "Authenticated users read published free samples"
ON public.kardb_free_samples
FOR SELECT
TO authenticated
USING (status = 'published');

-- Only admins can manage sample records.
CREATE POLICY "Admins manage free samples"
ON public.kardb_free_samples
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE profiles.id = (SELECT auth.uid())
          AND profiles.role = 'admin'
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE profiles.id = (SELECT auth.uid())
          AND profiles.role = 'admin'
    )
);

-- 3. Preserve the existing subscription entitlement rules,
--    but allow old reports only to users registered before cutoff.
CREATE OR REPLACE FUNCTION public.can_view_research_report(p_report_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO ''
AS $function$
    SELECT
        EXISTS (
            SELECT 1
            FROM public.profiles
            WHERE id = auth.uid()
              AND role = 'admin'
        )
        OR
        (
            EXISTS (
                SELECT 1
                FROM public.profiles u
                CROSS JOIN public.research_access_settings cfg
                WHERE u.id = auth.uid()
                  AND cfg.id = true
                  AND u.created_at < cfg.grandfather_cutoff_at
            )
            AND
            EXISTS (
                SELECT 1
                FROM public.research_reports r
                JOIN public.monthly_batches b
                    ON b.id = r.batch_id
                JOIN public.subscriptions s
                    ON s.user_id = auth.uid()
                JOIN public.plans p
                    ON p.id = s.plan_id
                WHERE r.id = p_report_id
                  AND r.status = 'published'
                  AND b.status = 'published'
                  AND s.status = 'active'
                  AND s.starts_at <= now()
                  AND s.expires_at > now()
                  AND p.is_active = true
                  AND r.sequence_number <= p.report_limit
                  AND b.batch_month >=
                    date_trunc(
                        'month',
                        s.starts_at AT TIME ZONE 'Asia/Kolkata'
                    )::date
                  AND b.batch_month <=
                    date_trunc(
                        'month',
                        s.expires_at AT TIME ZONE 'Asia/Kolkata'
                    )::date
                  AND (
                    b.batch_month =
                      date_trunc(
                          'month',
                          s.starts_at AT TIME ZONE 'Asia/Kolkata'
                      )::date
                    OR r.published_at >= s.starts_at
                  )
                  AND r.published_at < s.expires_at
            )
        );
$function$;

-- 4. Allow authenticated users to read published sample PDFs
--    from the existing private research-reports bucket.
CREATE POLICY "Authenticated users view published free sample PDFs"
ON storage.objects
FOR SELECT
TO authenticated
USING (
    bucket_id = 'research-reports'
    AND auth.uid() IS NOT NULL
    AND EXISTS (
        SELECT 1
        FROM public.kardb_free_samples s
        WHERE s.storage_path = storage.objects.name
          AND s.status = 'published'
    )
);

COMMIT;
