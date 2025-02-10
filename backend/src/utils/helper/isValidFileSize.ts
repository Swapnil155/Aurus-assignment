export const isValidFileSize = (value: File) => {
    // Check the file size here, e.g., to ensure it's not larger than a specific limit.
    // Adjust the maximum size as needed (in bytes).
    const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB

    if (value && value.size <= maxSizeInBytes) {
        return true; // Valid file size
    }

    return false; // Invalid file size
}