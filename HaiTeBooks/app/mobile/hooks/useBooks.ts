import { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosConfig';
import { Book } from '../types/book';

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchBooks = async () => {
      try {
        const resp = await axiosInstance.get<Book[]>('/books');
        if (mounted) setBooks(resp.data);
      } catch (err: any) {
        if (mounted) setError(err?.response?.data?.message ?? err.message ?? 'Error fetching books');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBooks();
    return () => {
      mounted = false;
    };
  }, []);

  return { books, loading, error };
};