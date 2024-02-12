export const addPrevValues = (log, prevLog) => {
    if (!prevLog) return log
    return log.times.map((item, index) => ({
        ...item,
        prevWeight: prevLog ? prevLog.times[index].weight : 0,
        prevRepeat: prevLog ? prevLog.times[index].repeat : 0,
    }))
}