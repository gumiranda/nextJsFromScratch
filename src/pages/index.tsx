import {
  Card, Col, Row, Avatar,
} from 'antd';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
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
      <Head>
        <title>GrowthHackTest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main-container">
        <div className="site-card-wrapper">
          <Row gutter={12}>
            <Col span={8}>
              <Link href="/puppy">
                <Card className="main-card" loading={loading}>
                  <Meta
                    avatar={
                      <Avatar src="http://www.recipepuppy.com/img/logonew.png" />
            }
                    title="Recipe Puppy"
                    description=" This api lets you search through recipe puppy database of over a million recipes by keyword and/or by search query."
                  />
                </Card>
              </Link>

            </Col>
            <Col span={8}>
              <Link href="/brewery">
                <Card className="main-card" loading={loading}>
                  <Meta
                    avatar={
                      <Avatar src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iZmlsbC1jdXJyZW50IHRleHQtYmxhY2siIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTEyIDZjNS41MjMgMCAxMC0xLjM0MyAxMC0zcy00LjQ3Ny0zLTEwLTMtMTAgMS4zNDMtMTAgM2MwIDEuNjU3IDQuNDc4IDMgMTAgM3ptMCAxNGMtMi44NiAwLTUuNTc1LS4zNDItNy42NDYtLjk2My0uOTg2LS4yOTYtMS43NTItLjY0LTIuMzU0LTEuMDA4djIuNDcxYzAgMS45MzMgNC40NzggMy41IDEwIDMuNSA1LjUyMyAwIDEwLTEuNTY3IDEwLTMuNXYtMi40NzFjLS42MDIuMzY4LTEuMzY4LjcxMi0yLjM1NCAxLjAwOC0yLjA3LjYyMS00Ljc4Ni45NjMtNy42NDYuOTYzem0wLTZjLTIuODYgMC01LjU3NS0uMzQyLTcuNjQ2LS45NjMtLjk4Ni0uMjk2LTEuNzUyLS42NC0yLjM1NC0xLjAwOHYyLjk3MWMwIDEuNjU3IDQuNDc4IDMgMTAgMyA1LjUyMyAwIDEwLTEuMzQzIDEwLTN2LTIuOTcxYy0uNjAyLjM2OC0xLjM2OC43MTItMi4zNTQgMS4wMDgtMi4wNy42MjEtNC43ODYuOTYzLTcuNjQ2Ljk2M3ptMC02Yy0yLjg2IDAtNS41NzUtLjM0Mi03LjY0Ni0uOTYzLS45ODYtLjI5Ni0xLjc1Mi0uNjQtMi4zNTQtMS4wMDh2Mi45NzFjMCAxLjY1NyA0LjQ3OCAzIDEwIDMgNS41MjMgMCAxMC0xLjM0MyAxMC0zdi0yLjk3MWMtLjYwMi4zNjgtMS4zNjguNzEyLTIuMzU0IDEuMDA4LTIuMDcuNjIxLTQuNzg2Ljk2My03LjY0Ni45NjN6Ii8+PC9zdmc+Cg==" />
            }
                    title="List Breweries"
                    description="Open Brewery DB is a free dataset and API with public information on breweries, cideries, brewpubs, and bottleshops."
                  />
                </Card>
              </Link>
            </Col>
          </Row>
        </div>

      </div>

    </>
  );
}
