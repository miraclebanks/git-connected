import tw from "twin.macro";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as TwitterIcon } from "../assets/twitter-icon.svg";
import { ReactComponent as GitHubIcon } from "../assets/github-icon.svg";
import { ReactComponent as LinkedInIcon } from "../assets/linkedin-icon.svg";

import { myContext } from "../hooks/Context"
import React, { useContext } from "react"
import { IUser } from "../types/maintypes"

const Container = tw.div`flex flex-col px-6 text-gray-100`;
const Content = tw.div`flex-row flex max-w-screen-xl mx-auto py-2 lg:py-24`;


const Card = tw.div`mx-auto xl:mx-0 xl:ml-auto max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-xs`;
const CardImageContainer = styled.div`
    ${tw`flex justify-center`}
`
const CardImage = styled.img`
    ${tw`h-4/6 w-4/6 rounded-full shadow-xl mb-2`}
`

const CardText = tw.div`mt-4`;
const CardLocation = tw.div`font-semibold text-sm text-gray-600`;
const CardBio = tw.h5`text-lg mt-4 font-bold text-gray-100 text-center`;
const CardHeader = tw.div`flex justify-center items-center flex-col`;
const CardName = tw.div`text-primary-500 font-bold text-xl`;

const CardMeta = styled.div`
  ${tw`flex flex-row flex-wrap justify-center sm:items-center font-semibold tracking-wide text-gray-600 uppercase text-xs`}
`;

const CardMetaFeature = styled.a`
  ${tw`flex items-center mt-4 mr-4 last:mr-0`}
  svg {
    ${tw`w-5 h-5 mr-1`}
  }
`;

const Header = tw.h1`flex flex-col items-center text-5xl font-bold`

export default function Home() {
  const user = useContext(myContext) as IUser

  console.log(user)
  if (!user) {
    return <p>loading...</p>
  }
  return (
    <>
      <Navbar />

      <Container>
      <Header>Git to Know...</Header>
        <Content>
        
          <Card>
            <CardImageContainer>
                <CardImage src={user.photos[0].value}/>
            </CardImageContainer>
            <CardText>
              <CardHeader>
                <CardName>{user.username}</CardName>
                <CardLocation>{user.json["location"]}</CardLocation>
              </CardHeader>
              <CardBio>{user.json["bio"]}</CardBio>
              <CardMeta>
                <CardMetaFeature href={user.json["twitter_username"]}>
                  <TwitterIcon />
                </CardMetaFeature>
                <CardMetaFeature>
                  <GitHubIcon />
                </CardMetaFeature>
                <CardMetaFeature>
                  <LinkedInIcon />
                </CardMetaFeature>
              </CardMeta>
            </CardText>
          </Card>
        </Content>
      </Container>
      <Footer />
    </>
  );
};