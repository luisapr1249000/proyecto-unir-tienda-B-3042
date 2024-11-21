import moment from "moment";

export const formatDate = (date: Date) => moment(date).format("LLL");

export const isValidDateMoment = (dateString: any) =>
  moment(dateString).isValid();
