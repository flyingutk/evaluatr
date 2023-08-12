export const fetchPathData = (path) => {
    pathData = path.split("/")
    return({
        destination: pathData[0],
        id: pathData[1]
    })
} 