-- Enable public access to the videos-italia bucket

-- 1. Create the bucket if it doesn't exist (idempotent)
INSERT INTO storage.buckets (id, name, public)
VALUES ('videos-italia', 'videos-italia', true)
ON CONFLICT (id) DO UPDATE
SET public = true;

-- 2. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public Access to Videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Users Can Upload Videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Users Can Update Videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Users Can Delete Videos" ON storage.objects;

-- 3. Create Policy: Public Read Access
CREATE POLICY "Public Access to Videos"
ON storage.objects FOR SELECT
USING ( bucket_id = 'videos-italia' );

-- 4. Create Policy: Authenticated Upload (for admins)
CREATE POLICY "Authenticated Users Can Upload Videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'videos-italia' );

-- 5. Create Policy: Authenticated Update (for admins)
CREATE POLICY "Authenticated Users Can Update Videos"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'videos-italia' );

-- 6. Create Policy: Authenticated Delete (for admins)
CREATE POLICY "Authenticated Users Can Delete Videos"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'videos-italia' );

COMMIT;
