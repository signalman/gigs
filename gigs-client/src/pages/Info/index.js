import { Box, } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StageDummyImg from '../../images/stage_tmp.jpg';
import StarDummyImg from '../../images/star_tmp.jpg';
import { DUMMY, SYMBOL } from '../../utils/Constants';
import StageDetailInfoBox from './StageDetailInfoBox';
import ReviewBox from '../../components/ReviewBox';
import './style.css';
import ReservationBox from './ReservationBox';
import InfoTitle from './InfoTitle';
import Introduction from './Introduction';
import MapBox from './MapBox';
import { fetchHostInfo, fetchStarInfo, updateHostInfo, updateStarInfo } from '../../utils/Api';
import StarDetailInfoBox from './StarDetailInfoBox';
import SimpleEditTexetDialog from './dialogs/SimpleEditTextDialog';
import EditTargetDialog from './dialogs/EditTargetDialog';
import useDialog from '../../hooks/useDialog';
import SelectOneDialog from './dialogs/SelectOneDialog';
import EditIntroduceDialog from './dialogs/EditIntroduceDialog';
import SelectAllDialog from './dialogs/SelectAllDialog';
import EditMemberDialog from './dialogs/EditMemberDialog';
import { useCookies } from 'react-cookie';
import ImageBox from './ImageBox';

const Info = ({
  target,
}) => {
  const params = useParams();
  const [cookies, setCookie, removeCookie] = useCookies(['userId']);

  const [data, setData] = useState(DUMMY.host);
  const [posts, setPosts] = useState(DUMMY.host.posts);
  const editable = Number(cookies.userId) === data.userId;

  const editNameDialog = useDialog();
  // const editAddressDialog = useDialog(); // TODO: 우편번호 API 로 구현
  const editAreaDialog = useDialog();
  const editTargetDialog = useDialog();
  const editPayDialog = useDialog();
  const editStageTypeDialog = useDialog();
  const editIntroduceDialog = useDialog();

  const editGenresDialog = useDialog();
  const editMemberDialog = useDialog();
  const editStageTypesDialog = useDialog();

  const getStarInfo = useCallback(async () => {
    const response = await fetchStarInfo(params.id);

    const newData = {
      userId: response.data.userId,
      starId: response.data.starId,

      name: response.data.name,
      score: response.data.score,
      reviewCount: response.data.reviews?.length,
      introduce: response.data.introduce,

      genres: response.data.starGenres?.map(genre => genre.genreName),
      gender: response.data.gender,
      memberNumber: response.data.memberNumber,
      stageTypes: response.data.starStageTypes?.map(stageType => stageType.stageTypeName),
      showCount: response.data?.showCount,
    }

    console.log(newData);
    
    setData(newData);
  }, [params]);

  const getHostInfo = useCallback(async () => {
    const response = await fetchHostInfo(params.id);

    const newData = {
      userId: response.data.userId,
      hostId: response.data.hostId,

      name: response.data.name,
      address: response.data.address,
      score: response.data.score,
      reviewCount: response.data.reviews?.length,
      introduce: response.data.introduce,

      stageSize: response.data.stageSize,
      targetAge: response.data.targetAge,
      targetGender: response.data.targetGender,
      targetMinCount: response.data.targetMinCount,
      pay: response.data.pay,
      showCount: response.data.showCount,
      stageType: response.data.stageType,
    }

    console.log(`호스트 검색 결과:`);
    console.log(newData);
    console.log(response.data.posts);

    setData(newData);
    setPosts(response.data.posts);
  }, [params]);

  const updateInfo = useCallback(async (newData) => {
    let response;

    try {
      switch(target) {
        case SYMBOL.stage:
          response = await updateHostInfo(data.stageId, newData);
          break;
        case SYMBOL.star:
          response = await updateStarInfo(data.starId, newData);
          break;
        default:
      }

      console.log(response);
      setData(newData);
    } catch(err) {
      console.log(err);
    }
  }, [target, data]);

  const handleEdit = useCallback((keys) => {
    return (values) => {
      const newData = {...data}
      for(let i = 0; i < keys.length; i++) {newData[keys[i]] = values[i];}
      console.log(newData);
      updateInfo(newData);
    }
  }, [data, updateInfo]);

  useEffect(() => {
    // dialog settings
    editNameDialog.initialize([data.name]);

    editAreaDialog.initialize([data.stageSize]);
    editTargetDialog.initialize([data.targetAge, data.targetGender, data.targetMinCount]);
    editPayDialog.initialize([data.pay]);
    editStageTypeDialog.initialize([data.stageType]);
    editIntroduceDialog.initialize([data.introduce]);

    editGenresDialog.initialize([data.genres]);
    editMemberDialog.initialize([data.gender, data.memberNumber]);
    editStageTypesDialog.initialize([data.stageTypes]);
  }, [data]);

  useEffect(() => {
    switch(target) {
      case SYMBOL.star:
        getStarInfo();
        break;
      case SYMBOL.stage:
        getHostInfo();
        break;
      default:
    }
  }, [target, getStarInfo, getHostInfo]);

  return (
    <>
      <Box sx={{ width: '100%', height: '300px', overflow: 'hidden', display: 'flex', alignItems: 'center', }}>
        <img src={target === SYMBOL.stage ? StageDummyImg : StarDummyImg} alt="img" width="100%" />
      </Box>

      <InfoTitle
        titleInfo={{
          name: data.name,
          address: data.address,
          score: data.score,
          reviewCount: data.reviewCount,
        }}
        openEditNameDialog={editNameDialog.open}
        editable={editable}
      />

      <Box sx={{ width: '1200px', display: 'flex', m: '0 auto', mt: '25px', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        {target === SYMBOL.stage ? (
          <StageDetailInfoBox
            detailInfo={{
              stageSize: data?.stageSize,
              targetAge: data?.targetAge,
              targetGender: data?.targetGender,
              targetMinCount: data?.targetMinCount,
              pay: data?.pay,
              showCount: data?.showCount,
              stageType: data?.stageType,
            }}
            editable={editable}
            openEditAreaDialog={editAreaDialog.open}
            openEditTargetDialog={editTargetDialog.open}
            openEditPayDialog={editPayDialog.open}
            openEditStageTypeDialog={editStageTypeDialog.open}
          />
        ) : (
          <StarDetailInfoBox
            detailInfo={{
              genres: data.genres,
              gender: data.gender,
              memberNumber: data.memberNumber,
              stageTypes: data.stageTypes,
              showCount: data.showCount,
            }}
            editable={editable}
            openEditGenresDialog={editGenresDialog.open}
            openEditMemberDialog={editMemberDialog.open}
            openEditStageTypesDialog={editStageTypesDialog.open}
          />
        )} 

        {target === SYMBOL.stage ? (
          <MapBox address={data.address} />
        ) : (<></>)}
      </Box>
      
      {target === SYMBOL.stage ? (
        <ReservationBox posts={posts} setPosts={setPosts} editable={editable} />
      ) : (<></>)}
      {/* 소개글 */}
      <Introduction editable={editable} openEditIntroduceDialog={editIntroduceDialog.open} introduce={data.introduce}/>
      {/* 이미지 */}
      <ImageBox />
      {/* 리뷰 */}
      <ReviewBox />

      {/* Dialogs */}
      <SimpleEditTexetDialog open={editNameDialog.isOpen} onClose={editNameDialog.close} title="이름 변경" type="text" values={editNameDialog.values} setValues={editNameDialog.setValues} onEdit={handleEdit(["name"])}  />
      {target === SYMBOL.stage ? (<>
        <SimpleEditTexetDialog open={editAreaDialog.isOpen} onClose={editAreaDialog.close} title="면적 변경" type="number" values={editAreaDialog.values} setValues={editAreaDialog.setValues} onEdit={handleEdit(["stageSize"])}  />
        <EditTargetDialog open={editTargetDialog.isOpen} onClose={editTargetDialog.close} title="고객층 변경" values={editTargetDialog.values} setValues={editTargetDialog.setValues} onEdit={handleEdit(["targetAge", "targetGender", "targetMinCount"])}  />
        <SimpleEditTexetDialog open={editPayDialog.isOpen} onClose={editPayDialog.close} title="가격 변경" type="number" values={editPayDialog.values} setValues={editPayDialog.setValues} onEdit={handleEdit(["pay"])} />
        <SelectOneDialog open={editStageTypeDialog.isOpen} onClose={editStageTypeDialog.close} title="무대 종류 변경" items={DUMMY.stageTypes} values={editStageTypeDialog.values} setValues={editStageTypeDialog.setValues} onEdit={handleEdit(["stageType"])} />
      </>) :
        target === SYMBOL.star ? (<>
          <SelectAllDialog open={editGenresDialog.isOpen} onClose={editGenresDialog.close} title="장르 변경" items={DUMMY.genres} values={editGenresDialog.values} setValues={editGenresDialog.setValues} onEdit={handleEdit(["genres"])} />
          <EditMemberDialog open={editMemberDialog.isOpen} onClose={editMemberDialog.close} title="멤버 구성 변경" values={editMemberDialog.values} setValues={editMemberDialog.setValues} onEdit={handleEdit(["gender", "memberNumber"])}  />
          <SelectAllDialog open={editStageTypesDialog.isOpen} onClose={editStageTypesDialog.close} title="선호 무대 종류 변경" items={DUMMY.stageTypes} values={editStageTypesDialog.values} setValues={editStageTypesDialog.setValues} onEdit={handleEdit(["stageTypes"])} />
        </>) : (<></>)
      }

      {editIntroduceDialog.isOpen ? (<EditIntroduceDialog open={editIntroduceDialog.isOpen} onClose={editIntroduceDialog.close} title="소개글 수정" values={editIntroduceDialog.values} onEdit={handleEdit(["introduce"])} />) : (<></>)}
      
    </>
    
  );
};

export default Info;