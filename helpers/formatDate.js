export const formatDate = (date) => {
    date = new Date(date);
    let day = date.getDate();
    day = day > 9 ? day : `0${day}`;
    
    let month = date.getMonth() + 1;
    month = month > 9 ? month : `0${month}`;

    return `${day}/${month}`;
}