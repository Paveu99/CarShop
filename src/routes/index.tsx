import { createFileRoute } from '@tanstack/react-router';
import { styled, Typography, Box } from '@mui/material';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

const Welcome = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(4),
  fontSize: '3rem',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

const Section = styled(Box)(({ theme }) => ({
  width: '70%',
  margin: '0 auto',
  lineHeight: 1.8,
  color: theme.palette.text.primary,
  paddingTop: theme.spacing(3),
}));

const Highlight = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  display: 'inline',
}));

const CategoryBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#1976d2',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const CreatorBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#1976d2',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const HistoryBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#1976d2',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

function RouteComponent() {
  return (
    <Box sx={{ padding: 2 }}>
      <Welcome>Welcome to Car Shop</Welcome>
      <Section>
        <CategoryBox>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.3rem' }}>
            <Highlight sx={{ color: 'white' }}>Categories:</Highlight> Manage categories and parts. You can add, remove, edit parts, and assign them to categories.
          </Typography>
        </CategoryBox>
        <CreatorBox>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.3rem' }}>
            <Highlight sx={{ color: 'white' }}>Creator:</Highlight> A step-by-step guide to select parts from various categories and finalize your order by providing necessary details.
          </Typography>
        </CreatorBox>
        <HistoryBox>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.3rem' }}>
            <Highlight sx={{ color: 'white' }}>History:</Highlight> View past orders with details like total value, itemized parts, and customer contact information.
          </Typography>
        </HistoryBox>
      </Section>
    </Box>
  );
}
