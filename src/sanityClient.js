import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'snzcif5z', 
  dataset: 'production',
  useCdn: true, // Speeds up loading for your users
  apiVersion: '2024-03-14', // Uses the latest API features
});
