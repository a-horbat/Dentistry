import React, { useState } from 'react';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Image from 'material-ui-image';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import step1 from './step1.jpeg';
import step2 from './step2.jpeg';
import step3 from './step3.jpeg';
import step4 from './step4.jpeg';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default ({ onRegister, onSignIn, onClose }) => {
  const [active, setActive] = useState(0);
  const steps = [
    <Step1 key="step-1" onRegister={onRegister} onSignIn={onSignIn} />,
    <Step2 key="step-2" onRegister={onRegister} onSignIn={onSignIn} />,
    <Step3 key="step-3" onRegister={onRegister} onSignIn={onSignIn} />,
    <Step4 key="step-4" onRegister={onRegister} onSignIn={onSignIn} />,
  ];
  const images = [step1, step2, step3, step4];
  const handleNext = () => setActive((active + 1) % steps.length);
  const handleBack = () => setActive(active ? active - 1 : steps.length - 1);
  return (
    <Dialog open fullScreen>
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        height="100%"
        overflow="hidden"
      >
        <Image
          src={images[active]}
          disableSpinner
          imageStyle={{
            objectFit: '100%',
            objectPosition: 'center',
            filter: 'blur(5px)',
          }}
          style={{
            position: 'absolute',
            top: -5,
            bottom: -5,
            left: -5,
            right: -5,
            width: 'calc(100vw + 10px)',
            height: 'calc(100vh + 10px)',
          }}
        />
        <div
          style={{
            background: `rgba(0, 0, 0, 0.5)`,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />
        <AutoPlaySwipeableViews
          index={active}
          interval={12000}
          onChangeIndex={setActive}
          slideStyle={{ height: '100%' }}
          containerStyle={{ height: '100%' }}
          style={{ flexGrow: 1, height: '100%' }}
          enableMouseEvents
        >
          {steps}
        </AutoPlaySwipeableViews>
        {onClose && (
          <Box position="absolute" right={0} top={0} padding={1}>
            <IconButton onClick={onClose} style={{ color: '#fff' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        <MobileStepper
          variant="dots"
          activeStep={active}
          steps={steps.length}
          style={{
            position: 'relative',
            bottom: 0,
            color: '#fff',
            backgroundColor: 'transparent',
          }}
          nextButton={
            <Button size="small" onClick={handleNext} style={{ color: '#fff' }}>
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} style={{ color: '#fff' }}>
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </Box>
    </Dialog>
  );
};
