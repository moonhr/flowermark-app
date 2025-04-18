declare module "react-native-daterange-picker" {
  import { Component } from "react";
  import { ViewStyle } from "react-native";
  import moment from "moment";

  interface DateRange {
    startDate?: moment.Moment;
    endDate?: moment.Moment;
    displayedDate?: moment.Moment;
  }

  interface Props {
    startDate?: moment.Moment;
    endDate?: moment.Moment;
    displayedDate?: moment.Moment;
    onChange: (dates: DateRange) => void;
    onDisplayedDateChange?: (date: moment.Moment) => void;
    open: boolean;
    range?: boolean;
    onToggle?: () => void;
    style?: ViewStyle;
    containerStyle?: ViewStyle;
    backdropStyle?: ViewStyle;
    headerTextStyle?: ViewStyle;
  }

  export default class DateRangePicker extends Component<Props> {}
}
