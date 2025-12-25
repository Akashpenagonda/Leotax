INSERT INTO public.user_roles (user_id, role)
VALUES ('b5c8ad32-2417-4bad-a285-bac278f6a797', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;