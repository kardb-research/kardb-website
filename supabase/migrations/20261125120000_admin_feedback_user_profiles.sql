create or replace function public.admin_feedback_user_profiles(p_user_ids uuid[])
returns table (
  id uuid,
  full_name text,
  email text
)
language plpgsql
stable
security definer
set search_path = ''
as $function$
begin
  if (select auth.uid()) is null
     or not exists (
       select 1
       from public.profiles as admin_profile
       where admin_profile.id = (select auth.uid())
         and admin_profile.role = 'admin'
     )
  then
    raise exception 'Admin access required'
      using errcode = '42501';
  end if;

  return query
    select profile.id, profile.full_name, profile.email
    from public.profiles as profile
    where profile.id = any(coalesce(p_user_ids, array[]::uuid[]));
end;
$function$;

revoke all on function public.admin_feedback_user_profiles(uuid[]) from public;
grant execute on function public.admin_feedback_user_profiles(uuid[]) to authenticated;
