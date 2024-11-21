function formatTime(seconds) {
    // Convert seconds into minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // If minutes are greater than or equal to 60, convert to hours
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    // Format hours, minutes, and seconds as strings with leading zeros if needed
    const formattedHours = hours > 0 ? String(hours).padStart(2, '0') + ':' : '';
    const formattedMinutes = String(remainingMinutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    // Return formatted time
    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
}

export {formatTime}