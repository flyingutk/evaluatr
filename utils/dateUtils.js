export const formatDate = (date) => {
    //dateArr = date.split('-')
    let formattedDate = new Date(date).toDateString()
    let dateArr = formattedDate.split(" ")
     return(
        `${dateArr[2]} ${dateArr[1]} ${dateArr[3]}`
     )
} 