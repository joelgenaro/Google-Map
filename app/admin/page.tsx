'use client';
import { useList } from '@refinedev/core';

export default function Admin() {
  const { data: products } = useList();

  return (
    <div>
      <h1>Admin Page</h1>
      <ul>
        {products?.data?.map((record) => (
          <li key={record.id}>{record.name}</li>
        ))}
      </ul>
    </div>
  );
}
