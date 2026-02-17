-- Create the whitelist table for authorized registrations
CREATE TABLE IF NOT EXISTS public.registros_autorizados (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    registrado BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.registros_autorizados ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to check if an email is authorized (for registration logic)
-- Note: In a highly secure environment, you might want to use an Edge Function instead of public SELECT.
-- But for this requirement, a simple SELECT filtered by email is acceptable.
CREATE POLICY "Public can check authorization" 
ON public.registros_autorizados FOR SELECT 
USING (true);

-- Policy: Authenticated users (admin) can manage the whitelist
CREATE POLICY "Admins can manage whitelist" 
ON public.registros_autorizados FOR ALL 
TO authenticated 
USING (true);

-- Insert some initial data for testing (optional)
-- INSERT INTO public.registros_autorizados (email) VALUES ('test@example.com');
