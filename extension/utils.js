"use strict";

/**
 * Convert ArrayBuffer to base64 string
 * @param {ArrayBuffer} arrayBuffer
 * @returns {String} Base64 string
 * @throws {Error} Error
 */
const bufferToBase64 = async (arrayBuffer) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () =>
            resolve(
                // Remove the Data-URL declaration
                reader.result.replace(
                    "data:application/octet-stream;base64,",
                    ""
                )
            );

        reader.onerror = () => reject(reader.error);

        reader.readAsDataURL(
            new File([new Uint8Array(arrayBuffer)], "", {
                type: "application/octet-stream",
            })
        );
    });

/**
 * Convert base64 string to ArrayBuffer
 * @param {String} base64String Base64 string
 * @returns {ArrayBuffer} ArrayBuffer
 */
const base64ToBuffer = async (base64String) => {
    const res = await fetch(
        "data:application/octet-stream;base64," + base64String
    );
    return await res.arrayBuffer();
};

export { bufferToBase64, base64ToBuffer };
