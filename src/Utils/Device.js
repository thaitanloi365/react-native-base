import { Dimensions, Platform, StatusBar, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");

const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

let _baseWidth = 375;
let _baseHeight = 812;

const hs = shortDimension / _baseWidth;
const vs = longDimension / _baseHeight;

const _isAndroid = Platform.OS == "android";

const _pixelRatio = PixelRatio.get();
const _adjustedWidth = width * _pixelRatio;
const _adjustedHeight = height * _pixelRatio;

function isAndroid() {
  return _isAndroid;
}

function isIOS() {
  return !_isAndroid;
}

function getScreenSize() {
  return { width, height };
}

function isIphoneX() {
  return Platform.OS === "ios" && (height === 812 || width === 812 || (height === 896 || width === 896));
}

function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

function getStatusBarHeight(safe) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight
  });
}

function getHeaderHeight() {
  const headerHeight = Platform.OS == "android" ? 56 : 44;
  return headerHeight;
}

function deviceType() {
  let type = "Phone";
  if (_pixelRatio < 2 && (_adjustedWidth >= 1000 || _adjustedHeight >= 1000)) {
    type = "Tablet";
  } else if (_pixelRatio === 2 && (_adjustedWidth >= 1920 || _adjustedHeight >= 1920)) {
    type = "Tablet";
  }
  return type;
}

function getStatusBarStyle() {
  // @ts-ignore
  const statusBarProps = StatusBar.prototype._defaultProps;
  if (statusBarProps && statusBarProps.barStyle && statusBarProps.barStyle.value) {
    return statusBarProps.barStyle.value;
  }
  return null;
}

function setBaseSize(width, height) {
  _baseWidth = width;
  _baseHeight = height;
}

/**
 *
 * @param {number} size
 * @return number
 */
function normalize(size) {
  if (_pixelRatio >= 2 && _pixelRatio < 3) {
    // iphone 5s and older Androids
    if (width < 360) {
      return size * 0.95;
    }

    // iphone 5
    if (height < 667) {
      return size;
      // iphone 6-6s
    }

    if (height >= 667 && height <= 735) {
      return size * 1.15;
    }
    // older phablets
    return size * 1.25;
  }

  if (_pixelRatio >= 3 && _pixelRatio < 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (width <= 360) {
      return size;
    }

    // Catch other weird android width sizings
    if (height < 667) {
      return size * 1.15;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }

    if (height >= 667 && height <= 735) {
      return size * 1.2;
    }

    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等
    return size * 1.27;
  }

  if (_pixelRatio >= 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (width <= 360) {
      return size;
      // Catch other smaller android height sizings
    }

    if (height < 667) {
      return size * 1.2;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }

    if (height >= 667 && height <= 735) {
      return size * 1.25;
    }

    // catch larger phablet devices
    return size * 1.4;
  }

  return size;
}

export default {
  getScreenSize,
  isAndroid,
  isIOS,
  getStatusBarHeight,
  getHeaderHeight,
  width,
  height,
  isIphoneX,
  ifIphoneX,
  deviceType,
  hs,
  vs,
  getStatusBarStyle,
  setBaseSize,
  normalize
};
