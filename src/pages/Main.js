import React from 'react'
    import {Container,TopContainer,TopTitle,ImageContainer,TopImage,BgImg,TopStart,
        ImageText,Btn,BottomContainer,BottomMainText,BootomSubText} from "../components/styledComponents"
    
const Main = () => {
  return (
    <Container>
      <TopContainer>
          <TopTitle>나와 닮은 정치인은?</TopTitle>
          <TopImage src={require("../assets/loading.png")}></TopImage>
      </TopContainer>

      {/* {showResult?<TopStart>분석결과는?</TopStart>:<TopStartLoading>{loading?"잠시만 기다려주세요!":"사진을 업로드 해주세요!"}</TopStartLoading>}
      <ImageContainer onClick={()=>{
          inputRef.current.click();
      }}>
        <ImageUploadContainer ref={inputRef} onChange={handleChangeFile} type="file" accept="image/*" />
        {imgBase64?<Image id="srcImg" src={imgBase64}></Image>: 
        <>
          <BgImg src={require("../assets/someone.png")}></BgImg>
          <ImageText>GIVE ME A YOUR PICTURE!</ImageText>
        </>
        }
      </ImageContainer>
      {!loading&&result===null?<>
      <CommentMsg>※업로드 된 사진은 별도로 수집, 보존
                  하지않고 얼굴인식 용도에만 사용됩니다.</CommentMsg>
      <div className='adfitOne'></div>
      <BottomImg src={require('../assets/png/beforeLoading.png')}></BottomImg>
      </>:null}

      {loading&&result===null?
      <>
        <Dots size={45} color="#224976"></Dots>
        <Title>분석중...</Title>
        <BottomImg src={require('../assets/png/NowLoading.png')}></BottomImg>
        </>
      :null
    } */}
    </Container>
  )
}

export default Main