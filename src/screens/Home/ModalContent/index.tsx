import React from 'react';

import * as S from './styles';

interface ModalContentProps {
  logOut: () => void;
  closeModal: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({ logOut, closeModal }) => {
  return (
    <S.Wrapper>
      <S.Container
        style={{
          backgroundColor: '#fafafa',
          padding: 20,
          borderRadius: 8,
          flexDirection: 'column'
        }}
      >
        <S.StrongTitle>Are you sure you want to exit?</S.StrongTitle>
        <S.FlexRow>
          <S.ButtonModal onPress={() => logOut()}>
            <S.Title>Yes</S.Title>
          </S.ButtonModal>
          <S.ButtonModal onPress={() => closeModal()}>
            <S.Title>No</S.Title>
          </S.ButtonModal>
        </S.FlexRow>
      </S.Container>
    </S.Wrapper>
  );
};

export default ModalContent;
