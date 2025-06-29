/*
  # Create Photo Upload User

  1. Authentication Setup
    - Creates a user account for photo uploads
    - Username: mejohnc
    - Password: ChristensenPlumbingCo
    - Email: mejohnc@christensenplumbing.com (required for Supabase auth)

  2. Security
    - User will have authenticated role for photo uploads
    - Can bypass anonymous upload restrictions
*/

-- Insert user into auth.users table
-- Note: In production Supabase, this would typically be done through the Auth API
-- This is a direct database approach for development/testing

DO $$
DECLARE
    user_id uuid;
BEGIN
    -- Generate a UUID for the user
    user_id := gen_random_uuid();
    
    -- Insert into auth.users (this may need to be done via Supabase Auth API in production)
    INSERT INTO auth.users (
        id,
        instance_id,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin,
        role
    ) VALUES (
        user_id,
        '00000000-0000-0000-0000-000000000000',
        'mejohnc@christensenplumbing.com',
        crypt('ChristensenPlumbingCo', gen_salt('bf')),
        now(),
        now(),
        now(),
        '{"provider": "email", "providers": ["email"]}',
        '{"username": "mejohnc"}',
        false,
        'authenticated'
    ) ON CONFLICT (email) DO NOTHING;
    
    -- Insert into auth.identities
    INSERT INTO auth.identities (
        id,
        user_id,
        identity_data,
        provider,
        created_at,
        updated_at
    ) VALUES (
        gen_random_uuid(),
        user_id,
        jsonb_build_object('sub', user_id::text, 'email', 'mejohnc@christensenplumbing.com'),
        'email',
        now(),
        now()
    ) ON CONFLICT (provider, user_id) DO NOTHING;
    
EXCEPTION
    WHEN insufficient_privilege THEN
        RAISE NOTICE 'Cannot create user directly in database. Please create user through Supabase Dashboard or Auth API.';
    WHEN OTHERS THEN
        RAISE NOTICE 'Error creating user: %', SQLERRM;
END $$;