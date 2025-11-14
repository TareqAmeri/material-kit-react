import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

/**
 * SIGN-IN VIEW COMPONENT
 * 
 * A modern, elegant login interface for ProjectHub
 * Features:
 * - Dark Premium Theme with gradient backgrounds
 * - Material Design 3.0 principles
 * - Responsive design
 * - Enhanced security with password visibility toggle
 * - Social authentication options
 */
export function SignInView() {
  const router = useRouter();

  // STATE: Password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // HANDLER: Sign-in action - redirects to dashboard
  const handleSignIn = useCallback(() => {
    router.push('/');
  }, [router]);

  // RENDER: Main login form
  const renderForm = (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
      }}
    >
      {/* EMAIL INPUT FIELD */}
      <TextField
        fullWidth
        name="email"
        label="Email Address"
        placeholder="your.email@projecthub.com"
        defaultValue="demo@projecthub.com"
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'solar:letter-unread-bold' as any} width={24} sx={{ color: 'primary.main' }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
          },
        }}
      />

      {/* PASSWORD INPUT FIELD */}
      <TextField
        fullWidth
        name="password"
        label="Password"
        placeholder="Enter your password"
        defaultValue="demo1234"
        type={showPassword ? 'text' : 'password'}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'solar:lock-password-bold' as any} width={24} sx={{ color: 'primary.main' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton 
                  onClick={() => setShowPassword(!showPassword)} 
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  <Iconify 
                    icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} 
                    width={22}
                  />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
          },
        }}
      />

      {/* FORGOT PASSWORD LINK */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link 
          variant="body2" 
          color="primary.main" 
          underline="hover"
          sx={{ 
            fontWeight: 500,
            cursor: 'pointer',
            '&:hover': {
              color: 'primary.dark',
            },
          }}
        >
          Forgot password?
        </Link>
      </Box>

      {/* SIGN IN BUTTON - Dark Premium Gradient */}
      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleSignIn}
        sx={{
          py: 1.5,
          mt: 1,
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          boxShadow: '0 4px 20px rgba(42, 82, 152, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1e3c72 20%, #2a5298 120%)',
            boxShadow: '0 6px 25px rgba(42, 82, 152, 0.5)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        Sign In to ProjectHub
      </Button>
    </Box>
  );

  return (
    <>
      {/* LOGO & WELCOME SECTION */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 4,
          gap: 2,
        }}
      >
        {/* APP ICON with Dark Premium Gradient */}
        <Avatar
          sx={{
            width: 64,
            height: 64,
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
            boxShadow: '0 8px 24px rgba(42, 82, 152, 0.3)',
          }}
        >
          <Iconify icon={'solar:widget-5-bold' as any} width={36} sx={{ color: 'white' }} />
        </Avatar>

        {/* WELCOME TEXT */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
            }}
          >
            Welcome Back
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary',
              fontWeight: 400,
            }}
          >
            Sign in to continue to ProjectHub
          </Typography>
        </Box>
      </Box>

      {/* MAIN LOGIN FORM */}
      {renderForm}

      {/* DIVIDER */}
      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 600, px: 2 }}
        >
          OR CONTINUE WITH
        </Typography>
      </Divider>

      {/* SOCIAL LOGIN OPTIONS */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
        }}
      >
        {/* GOOGLE */}
        <IconButton 
          size="large"
          sx={{ 
            border: 1, 
            borderColor: 'divider',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'action.hover',
            },
          }}
        >
          <Iconify width={24} icon="socials:google" />
        </IconButton>

        {/* GITHUB */}
        <IconButton 
          size="large"
          sx={{ 
            border: 1, 
            borderColor: 'divider',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'action.hover',
            },
          }}
        >
          <Iconify width={24} icon="socials:github" />
        </IconButton>

        {/* MICROSOFT */}
        <IconButton 
          size="large"
          sx={{ 
            border: 1, 
            borderColor: 'divider',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'action.hover',
            },
          }}
        >
          <Iconify width={24} icon="socials:twitter" />
        </IconButton>
      </Box>

      {/* SIGN UP LINK */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Don&apos;t have an account?{' '}
          <Link 
            variant="subtitle2" 
            color="primary.main"
            underline="hover"
            sx={{ 
              fontWeight: 600,
              cursor: 'pointer',
              '&:hover': {
                color: 'primary.dark',
              },
            }}
          >
            Create Account
          </Link>
        </Typography>
      </Box>
    </>
  );
}
