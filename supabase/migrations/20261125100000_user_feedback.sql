-- KARDB: Authenticated user feedback and feature requests
-- Apply this migration in the Supabase SQL Editor or through Supabase CLI.

BEGIN;

CREATE TABLE IF NOT EXISTS public.user_feedback (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    submission_type text NOT NULL
        CHECK (submission_type IN ('feedback', 'feature_request')),
    category text NOT NULL
        CHECK (category IN (
            'Dashboard Improvement',
            'Market Data',
            'Economic Intelligence',
            'Equity Research',
            'New Feature Request',
            'Technical Issue',
            'Other'
        )),
    message text NOT NULL
        CHECK (char_length(trim(message)) BETWEEN 10 AND 3000),
    priority text NOT NULL DEFAULT 'Normal'
        CHECK (priority IN ('Low', 'Normal', 'High')),
    status text NOT NULL DEFAULT 'new'
        CHECK (status IN ('new', 'under_review', 'planned', 'completed', 'declined')),
    admin_notes text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS user_feedback_user_created_idx
    ON public.user_feedback (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS user_feedback_status_created_idx
    ON public.user_feedback (status, created_at DESC);

ALTER TABLE public.user_feedback ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.user_feedback FROM PUBLIC, anon;
GRANT SELECT, INSERT ON public.user_feedback TO authenticated;
GRANT UPDATE ON public.user_feedback TO authenticated;

DROP POLICY IF EXISTS "Users submit their own feedback" ON public.user_feedback;
CREATE POLICY "Users submit their own feedback"
ON public.user_feedback
FOR INSERT
TO authenticated
WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users read their own feedback" ON public.user_feedback;
CREATE POLICY "Users read their own feedback"
ON public.user_feedback
FOR SELECT
TO authenticated
USING (
    user_id = (SELECT auth.uid())
    OR EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE profiles.id = (SELECT auth.uid())
          AND profiles.role = 'admin'
    )
);

DROP POLICY IF EXISTS "Admins update feedback status" ON public.user_feedback;
CREATE POLICY "Admins update feedback status"
ON public.user_feedback
FOR UPDATE
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

COMMIT;
