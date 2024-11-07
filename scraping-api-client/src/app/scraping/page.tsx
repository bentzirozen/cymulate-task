'use client';
import React, { useState, useEffect } from 'react';
import { scrapeWebsite, getScrapingResults } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Divider,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface ScrapingResult {
  _id: string;
  url: string;
  domains: string[];
  urls: string[];
  scrapedAt: string;
}

export default function ScrapingPage() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState<ScrapingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchResults();
  }, [isAuthenticated]);

  const fetchResults = async () => {
    try {
      const data = await getScrapingResults();
      setResults(data);
    } catch (error) {
      toast.error('Failed to fetch results');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await scrapeWebsite(url);
      toast.success('Website scraped successfully!');
      fetchResults();
      setUrl('');
    } catch (error) {
      toast.error('Failed to scrape website');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Web Scraping Dashboard
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                label="Website URL"
                variant="outlined"
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
                sx={{ height: '56px' }}
              >
                {loading ? 'Scraping...' : 'Scrape'}
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          {results.map((result) => (
            <Grid item xs={12} md={6} key={result._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {result.url}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Scraped at: {new Date(result.scrapedAt).toLocaleString()}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body1">
                      Domains found: {result.domains.length}
                    </Typography>
                    <Typography variant="body1">
                      URLs found: {result.urls.length}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {results.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography color="textSecondary">
              No scraping results found. Try scraping a website!
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}