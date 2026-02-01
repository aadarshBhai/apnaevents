import { useState, useEffect } from 'react';

// Cloudinary configuration
const CLOUDINARY_CONFIG = {
  cloudName: 'demo', // Replace with your Cloudinary cloud name
  uploadPreset: 'eventdekho', // Replace with your upload preset
  apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
};

// Generate optimized image URL with Cloudinary transformations
export const getOptimizedImageUrl = (publicId, options = {}) => {
  const {
    width = 'auto',
    height = 'auto',
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
    dpr = 'auto',
    gravity = 'auto',
    ...otherOptions
  } = options;

  const transformations = [
    `w_${width}`,
    `h_${height}`,
    `c_${crop}`,
    `q_${quality}`,
    `f_${format}`,
    `dpr_${dpr}`,
    `g_${gravity}`,
  ];

  // Add any additional transformations
  Object.entries(otherOptions).forEach(([key, value]) => {
    transformations.push(`${key}_${value}`);
  });

  const transformationString = transformations.join(',');

  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/${transformationString}/${publicId}`;
};

// Generate responsive image URLs for different breakpoints
export const getResponsiveImageUrls = (publicId, baseOptions = {}) => {
  const breakpoints = {
    mobile: { width: 375, height: 667, crop: 'fill' },
    tablet: { width: 768, height: 1024, crop: 'fill' },
    desktop: { width: 1920, height: 1080, crop: 'fill' },
    large: { width: 2560, height: 1440, crop: 'fill' },
  };

  return Object.entries(breakpoints).reduce((acc, [device, options]) => {
    acc[device] = getOptimizedImageUrl(publicId, { ...baseOptions, ...options });
    return acc;
  }, {});
};

// Custom hook for lazy loading Cloudinary images
export const useCloudinaryImage = (publicId, options = {}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!publicId) {
      setError('No public ID provided');
      setIsLoading(false);
      return;
    }

    const loadImage = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Generate optimized URL
        const url = getOptimizedImageUrl(publicId, options);

        // Preload the image
        const img = new Image();
        img.src = url;

        img.onload = () => {
          setImageUrl(url);
          setIsLoading(false);
        };

        img.onerror = () => {
          setError('Failed to load image');
          setIsLoading(false);
        };
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    loadImage();
  }, [publicId, JSON.stringify(options)]);

  return { imageUrl, isLoading, error };
};

// Upload image to Cloudinary
export const uploadToCloudinary = async (file, options = {}) => {
  if (!file) {
    throw new Error('No file provided');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
  formData.append('api_key', CLOUDINARY_CONFIG.apiKey);

  // Add additional options
  Object.entries(options).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return {
      publicId: data.public_id,
      url: data.secure_url,
      format: data.format,
      width: data.width,
      height: data.height,
      size: data.bytes,
    };
  } catch (error) {
    throw new Error(`Upload error: ${error.message}`);
  }
};

// Generate placeholder image URL
export const getPlaceholderUrl = (width = 400, height = 300) => {
  return `https://res.cloudinary.com/demo/image/upload/w_${width},h_${height},c_fill,q_auto,f_auto/placeholder.jpg`;
};

// Custom hook for image gallery with lazy loading
export const useCloudinaryGallery = (publicIds, options = {}) => {
  const [images, setImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!publicIds || publicIds.length === 0) {
      setImages({});
      setIsLoading(false);
      return;
    }

    const loadImages = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const imagePromises = publicIds.map(async (publicId) => {
          const url = getOptimizedImageUrl(publicId, options);
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve({ publicId, url });
            img.onerror = () => reject(new Error(`Failed to load ${publicId}`));
          });
        });

        const loadedImages = await Promise.all(imagePromises);
        const imagesMap = loadedImages.reduce((acc, img) => {
          acc[img.publicId] = img.url;
          return acc;
        }, {});

        setImages(imagesMap);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    loadImages();
  }, [publicIds, JSON.stringify(options)]);

  return { images, isLoading, error };
};

// Background image optimization
export const getBackgroundImageUrl = (publicId, options = {}) => {
  return getOptimizedImageUrl(publicId, {
    quality: 'auto:good',
    format: 'auto',
    dpr: 'auto',
    crop: 'fill',
    gravity: 'auto',
    ...options,
  });
};

// Avatar image optimization
export const getAvatarUrl = (publicId, size = 100) => {
  return getOptimizedImageUrl(publicId, {
    width: size,
    height: size,
    crop: 'fill',
    gravity: 'face',
    radius: 'max',
    quality: 'auto:good',
    format: 'auto',
  });
};

// Thumbnail generation
export const getThumbnailUrl = (publicId, width = 200, height = 200) => {
  return getOptimizedImageUrl(publicId, {
    width,
    height,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto:good',
    format: 'auto',
  });
};

export default {
  getOptimizedImageUrl,
  getResponsiveImageUrls,
  useCloudinaryImage,
  uploadToCloudinary,
  getPlaceholderUrl,
  useCloudinaryGallery,
  getBackgroundImageUrl,
  getAvatarUrl,
  getThumbnailUrl,
};
