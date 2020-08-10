import * as React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { createIconSet } from '@expo/vector-icons';

type Obj = {
  [key: string]: number
}

const glyphMap: Obj = {
  'icon-quanzi': 59572,
  'icon-shezhi': 59575,
  'icon-shouye': 59577,
  'icon-activity': 59102,
  'icon-add': 59103,
  'icon-addition': 59104,
  'icon-addressbook': 59106,
  'icon-businesscard': 59110,
  'icon-camera': 59111,
  'icon-coordinates': 59116,
  'icon-createtask': 59119,
  'icon-document': 59123,
  'icon-empty': 59127,
  'icon-group': 59135,
  'icon-headlines': 59137,
  'icon-homepage': 59138,
  'icon-lock': 59145,
  'icon-message': 59148,
  'icon-people': 59157,
  'icon-remind': 59167,
  'icon-setup': 59176,
  'icon-stealth': 59180,
  'icon-systemprompt': 59184,
  'icon-task': 59186,
  'icon-time': 59189,
  'icon-trash': 59192,
  'icon-search': 59201,
  'icon-supply': 59232
};

const expoAssetId = require('../../../assets/fonts/iconfont.ttf');
const Iconfont = createIconSet(glyphMap, 'iconfont', expoAssetId);

interface Props {
  color?: string;
  name: string;
  onPress?: void;
  size?: number;
}
export class CustomIcon extends React.PureComponent<Props> {
  renderIcon() {
    const { name } = this.props;
    return glyphMap[name] ? (<Iconfont {...this.props} />) : null;
  }
  render() {
    const { onPress } = this.props;
    return onPress ? (
      <TouchableWithoutFeedback onPress={onPress}>
        { this.renderIcon() }
      </TouchableWithoutFeedback>
    ) : (this.renderIcon());
  }
}
