"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { getStaticProps } from "next/dist/build/templates/pages";

const Header = styled.header`
  display: flex;
  padding: 24px;
  .count {
    color: #49454f50;
  }
`;

const CardContainer = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(4, 1fr);
  padding: 56px 24px 112px 24px;
  transition: all 0.5s ease;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  border: 1px solid #CAC4D0;
  background: #FEF7FF;
  overflow: hidden;

  img {
    height: 250px;
    width: 100%;
    object-fit: cover;
  }
`;

const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 12px;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.p`
  font-weight: bold;
`;

const Home = () => {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const endpoint = "https://api.thedogapi.com/v1/breeds";
    axios.get(endpoint).then((res) => {
      console.log(res.data);
      setBreeds(res.data);
    });
  }, []);

  return (
    <div className="page">
      <Header>
        {breeds.length > 0 && (
          <h1>
            Breeds <span className='count'>{breeds.length}</span>
          </h1>
        )}
      </Header>
      <CardContainer>
        {breeds.map((breed) => (
          <Card className="card" key={breed.id}>
            <img
              src={`https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`}
              alt={breed.name}
            />
            <StatContainer>
              <Stat>
                <Label>Weight</Label>
                <p>{breed.weight.metric} kg</p>
              </Stat>
              <Stat>
                <Label>Breed</Label>
                <p>{breed.name}</p>
              </Stat>
              <Stat>
                <Label>Temperament</Label>
                <p>{breed.temperament}</p>
              </Stat>
              <Stat>
                <Label>Origin</Label>
                {breed.origin 
                  ? <p>{breed.origin}</p>
                  : <p>-</p>
                }
              </Stat>
              <Stat>
                <Label>Life Span</Label>
                <p>{breed.life_span}</p>
              </Stat>
            </StatContainer>
          </Card>
        ))}
      </CardContainer>
    </div>
  );
};

export default Home;
