import React from 'react';
import AutocompleteAsync from './AutocompleteAsync'; 

const HomePage = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Box
        sx={{
          backgroundColor: '#282c34',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom style={{ color: 'white', textAlign: 'center' }}>
          Rick and Morty Karakter Arama
        </Typography>
        <Typography variant="body1" style={{ color: 'gray', marginBottom: '20px', textAlign: 'center' }}>
          En sevdiğin karakterleri ara ve detaylarını öğren!
        </Typography>
        <AutocompleteAsync />
      </Box>
    </Container>
  );
};

export default HomePage;
