import {
  Card, Col, Row, Avatar,
} from 'antd';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout/Layout';
import { connectToDatabase } from '../util/mongodb';

const { Meta } = Card;

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase();

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}

export default function Home({ isConnected }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (isConnected) {
      setLoading(false);
    }
  }, [isConnected]);
  return (
    <>
      <Layout>
        <Link href="/fipe">
          <Card className="main-card" loading={loading}>
            <Meta
              avatar={
                <Avatar src="data:image/png;base64,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" />
            }
              title="Table Fipe"
              description=" The Table FIPE expresses average vehicle prices in the national market, serving only as a parameter for earning or evaluations. The prices charged vary according to the region, conservation, color, accessories or any other factor that influences the conditions of supply and demand for a specific vehicle."
            />
          </Card>
        </Link>

        <Link href="/brewery">
          <Card className="main-card" loading={loading}>
            <Meta
              avatar={
                <Avatar src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iZmlsbC1jdXJyZW50IHRleHQtYmxhY2siIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTEyIDZjNS41MjMgMCAxMC0xLjM0MyAxMC0zcy00LjQ3Ny0zLTEwLTMtMTAgMS4zNDMtMTAgM2MwIDEuNjU3IDQuNDc4IDMgMTAgM3ptMCAxNGMtMi44NiAwLTUuNTc1LS4zNDItNy42NDYtLjk2My0uOTg2LS4yOTYtMS43NTItLjY0LTIuMzU0LTEuMDA4djIuNDcxYzAgMS45MzMgNC40NzggMy41IDEwIDMuNSA1LjUyMyAwIDEwLTEuNTY3IDEwLTMuNXYtMi40NzFjLS42MDIuMzY4LTEuMzY4LjcxMi0yLjM1NCAxLjAwOC0yLjA3LjYyMS00Ljc4Ni45NjMtNy42NDYuOTYzem0wLTZjLTIuODYgMC01LjU3NS0uMzQyLTcuNjQ2LS45NjMtLjk4Ni0uMjk2LTEuNzUyLS42NC0yLjM1NC0xLjAwOHYyLjk3MWMwIDEuNjU3IDQuNDc4IDMgMTAgMyA1LjUyMyAwIDEwLTEuMzQzIDEwLTN2LTIuOTcxYy0uNjAyLjM2OC0xLjM2OC43MTItMi4zNTQgMS4wMDgtMi4wNy42MjEtNC43ODYuOTYzLTcuNjQ2Ljk2M3ptMC02Yy0yLjg2IDAtNS41NzUtLjM0Mi03LjY0Ni0uOTYzLS45ODYtLjI5Ni0xLjc1Mi0uNjQtMi4zNTQtMS4wMDh2Mi45NzFjMCAxLjY1NyA0LjQ3OCAzIDEwIDMgNS41MjMgMCAxMC0xLjM0MyAxMC0zdi0yLjk3MWMtLjYwMi4zNjgtMS4zNjguNzEyLTIuMzU0IDEuMDA4LTIuMDcuNjIxLTQuNzg2Ljk2My03LjY0Ni45NjN6Ii8+PC9zdmc+Cg==" />
            }
              title="List Breweries"
              description="Open Brewery DB is a free dataset and API with public information on breweries, cideries, brewpubs, and bottleshops.It is our belief that public information should be freely accessible for the betterment of the beer community and the happiness of web developers and data analysts."
            />
          </Card>
        </Link>

      </Layout>

    </>
  );
}
