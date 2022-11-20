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
import { fetchHostInfo, fetchStarInfo } from '../../utils/Api';
import StarDetailInfoBox from './StarDetailInfoBox';
import SimpleEditTexetDialog from './dialogs/SimpleEditTextDialog';
import EditTargetDialog from './dialogs/EditTargetDialog';
import useDialog from '../../hooks/useDialog';
import SelectOneDialog from './dialogs/SelectOneDialog';
import EditIntroduceDialog from './dialogs/EditIntroduceDialog';

const Info = ({
  target,
}) => {
  const params = useParams();

  const [data, setData] = useState(DUMMY.host);

  const [isEditAreaDialogOpen, openEditAreaDialog, closeEditAreaDialog] = useDialog();
  const [isEditTargetDialogOpen, openEditTargetDialog, closeEditTargetDialog] = useDialog();
  const [isEditPayDialogOpen, openEditPayDialog, closeEditPayDialog] = useDialog();
  const [isEditStageTypeDialogOpen, openEditStageTypeDialog, closeEditStageTypeDialog] = useDialog();
  const [isEditIntroduceDialogOpen, openEditIntroduceDialog, closeEditIntroduceDialog] = useDialog();

  const handleEdit = useCallback((keys) => {
    return (values) => {
      const newData = {...data}

      for(let i = 0; i < keys.length; i++) {
        newData[keys[i]] = values[i];
      }
      
      console.log(newData);
    }
  }, [data]);

  useEffect(() => {
    switch(target) {
      case SYMBOL.star:
        fetchStarInfo(params.id, (response) => {
          const newData = {
            name: response.data.name,
            // address: '',
            score: response.data.score,
            reviewCount: response.data.reviews?.length,
            introduce: response.data.introduce,

            genres: response.data.starGenres,
            gender: response.data.gender,
            memberNumber: response.data.memberNumber,
            stageTypes: response.data.starStageTypes,
            showCount: response.data?.showCount,
          }
          
          setData(newData);
        });
        break;
      case SYMBOL.stage:
        fetchHostInfo(params.id, (response) => {
          const newData = {
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

          console.log(newData);

          setData(newData);
        });
        break;
      default:
    }
  }, [params, target]);

  return (
    <>
      <Box sx={{ width: '100%', height: '300px', overflow: 'hidden', display: 'flex', alignItems: 'center', }}>
        <img src={target === SYMBOL.stage ? StageDummyImg : StarDummyImg} alt="img" width="100%" />
      </Box>

      <InfoTitle titleInfo={{
        name: data.name,
        address: data.address,
        score: data.score,
        reviewCount: data.reviewCount,
      }} />

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
            openEditAreaDialog={openEditAreaDialog}
            openEditTargetDialog={openEditTargetDialog}
            openEditPayDialog={openEditPayDialog}
            openEditStageTypeDialog={openEditStageTypeDialog}
          />
        ) : (
          <StarDetailInfoBox detailInfo={{
            genres: data.genres,
            gender: data.gender,
            memberNumber: data.memberNumber,
            stageTypes: data.stageTypes,
            showCount: data.showCount,
          }} />
        )} 

        {target === SYMBOL.stage ? (
          <MapBox address={data.address} />
        ) : (<></>)}
      </Box>
      
      {target === SYMBOL.stage ? (
        <ReservationBox data={data} />
      ) : (<></>)}
      {/* 소개글 */}
      <Introduction openEditIntroduceDialog={openEditIntroduceDialog} introduce={data.introduce}/>
      {/* 리뷰 */}
      <ReviewBox />

      {/* Dialogs */}
      <SimpleEditTexetDialog open={isEditAreaDialogOpen} onClose={closeEditAreaDialog} title="면적 변경" type="number" onEdit={handleEdit(["stageSize"])}  />
      <EditTargetDialog open={isEditTargetDialogOpen} onClose={closeEditTargetDialog} title="고객층 변경" onEdit={handleEdit(["targetAge", "targetGender", "targetMinCount"])}  />
      <SimpleEditTexetDialog open={isEditPayDialogOpen} onClose={closeEditPayDialog} title="가격 변경" type="number" onEdit={handleEdit(["pay"])} />
      <SelectOneDialog open={isEditStageTypeDialogOpen} onClose={closeEditStageTypeDialog} title="무대 종류 변경" items={DUMMY.stageTypes} onEdit={handleEdit(["stageType"])} />
      <EditIntroduceDialog open={isEditIntroduceDialogOpen} onClose={closeEditIntroduceDialog} title="소개글 수정" onEdit={handleEdit(["introduce"])} />
    </>
    
  );
};

export default Info;