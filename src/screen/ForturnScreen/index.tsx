import React, {useEffect, useState} from 'react';
import {
  Pressable,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaFrame,
} from 'react-native-safe-area-context';
import {images} from '../../../Image';
import {msgs} from '../../../fortuneMsgs.json';
import {SvgXml} from 'react-native-svg';
import {svgs} from '../../common/svgs';

// 이미지 타입종류를 선언
export const imageTypes = {
  MAIN_FORTUNE: 'MAIN_FORTUNE',
  OPEN_FORTUNE: 'OPEN_FORTUNE', // 443 x 960 -> 108~328 ( 220 ) x  423 ~
};

// openfortune image original size와 원본기준으로 메시지가 출력될 위치를 선언
export const openFortuneInfo = {
  width: 443,
  height: 960,
  startMsgX: 108,
  startMsgY: 423,
  msgWidth: 220,
};
const FortuneScreen = (props: any) => {
  // 핸드폰 디바이스 사이즈 선언
  const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = useSafeAreaFrame();

  // 포츈쿠키에 나타날 메시지 위치를 디바이스 사이즈와 원본 사이즈 비율로 계산
  const showMsgStyle = {
    left: (DEVICE_WIDTH / openFortuneInfo.width) * openFortuneInfo.startMsgX,
    top: (DEVICE_HEIGHT / openFortuneInfo.height) * openFortuneInfo.startMsgY,
    width: (DEVICE_WIDTH / openFortuneInfo.width) * openFortuneInfo.msgWidth,
  };

  // 이미지 타입 상태변수
  const [state, setState] = useState(imageTypes.MAIN_FORTUNE);
  // 메시지 상태변수
  const [showMsg, setShowMsg] = useState('');

  // fortuneMsgs.json내 메시지들중 랜덤으로 가져오기 위한 함수
  const generateRandomResult = () => {
    const totalLength = msgs.length;
    let resultIdx = Math.floor(Math.random() * totalLength);
    resultIdx = resultIdx === totalLength ? resultIdx - 1 : resultIdx;
    return msgs[resultIdx];
  };

  // 메인 이미지를 눌렀을 때
  const handleMainFortunePress = () => {
    setShowMsg(generateRandomResult());
  };

  const handleRetryPress = () => {
    if (state === imageTypes.OPEN_FORTUNE) {
      setState(imageTypes.MAIN_FORTUNE);
      setShowMsg('');
      return true;
    } else {
      return false;
    }
  };

  // 뒤로가기 버튼을 눌렀을 때, 현재 보여지는 화면에 따라 초기화할지, 앱을 닫을지 이벤트조건 추가
  const handleBackPress = () => {
    if (state === imageTypes.OPEN_FORTUNE) {
      setState(imageTypes.MAIN_FORTUNE);
      setShowMsg('');
      return true;
    } else {
      return false;
    }
  };

  // showMsg값이 변경되었을때, 이미지가 변경되도록 설정
  useEffect(() => {
    if (showMsg === '') return;
    setState(imageTypes.OPEN_FORTUNE);
  }, [showMsg]);

  // back버튼 이벤트 추가/삭제
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [state]);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />
      {/* state가 MAIN_FORTUNE 일때만 초기화면이 보여짐 */}
      {state === imageTypes.MAIN_FORTUNE && (
        <View style={styles.mainFortuneImageView}>
          <TouchableWithoutFeedback onPress={handleMainFortunePress}>
            <Image
              source={images.mainForturn}
              style={styles.mainFortuneImage}
            />
          </TouchableWithoutFeedback>
        </View>
      )}

      {/* 결과화면을 보여줄 component */}
      <Image
        source={images.openForturn}
        style={[
          styles.mainFortuneImage,
          {opacity: state === imageTypes.OPEN_FORTUNE ? 1 : 0},
        ]}
      />
      <View style={[styles.showFortuneMsgView, showMsgStyle]}>
        <Text style={styles.showFortuneMsgText}>{showMsg}</Text>
        <View style={styles.retryBtnView}>
          <TouchableOpacity style={styles.retryBtn} onPress={handleRetryPress}>
            <SvgXml
              style={styles.retryIcon}
              xml={svgs.RELOAD}
              width={16}
              height={16}
              fill={'#fff'}
            />
            <Text style={styles.retryBtnText}>다시하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FortuneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainFortuneImageView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  mainFortuneImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  showFortuneMsgView: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  showFortuneMsgText: {
    fontSize: 14,
    color: '#000',
  },
  retryBtnView: {
    marginTop: 24,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#000',
  },
  retryIcon: {marginRight: 10},
  retryBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
