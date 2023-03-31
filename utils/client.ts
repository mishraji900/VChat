import {createClient} from '@sanity/client';

export const client = createClient({
  projectId: 'w4tqq5bz',
  dataset: 'production',
  apiVersion: '2023-03-30',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
