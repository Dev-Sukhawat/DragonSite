// Importing the loadDragons function from search.js
import { loadDragons } from './js/search.js';

// Wait for the DOM to be fully loaded before running any script
document.addEventListener('DOMContentLoaded', () => {

    // Load dragons
    loadDragons();  // Fetch and display dragons from gallery.json

    // Handle video element for scroll synchronization
    const video = document.querySelector('#scrollVideo');

    // Check if video exists, add event listeners if it does
    if (video) {
        video.addEventListener('error', () => {
            console.error('Video failed to load. Check the file path and format.');
        });

        // Ensure the video metadata is loaded
        video.addEventListener('loadedmetadata', () => {
            const duration = video.duration; // Get the total duration of the video in seconds

            // Sync the video playback with scrolling
            gsap.to(video, {
                currentTime: duration, // Play the entire video
                ease: "none", // Linear playback
                scrollTrigger: {
                    trigger: ".video-container", // Element to track scrolling
                    start: "top top", // Start when the top of the container reaches the top of the viewport
                    end: "bottom top", // End when the bottom of the container reaches the top of the viewport
                    toggleActions: "play none none restart",
                    scrub: true, // Smoothly sync scrolling with playback
                    pin: true, // Pin the container during scrolling
                    // markers: true // Uncomment for debugging
                }
            });
        });
    }

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Animate elements with the class "dragon-card"
    gsap.from(".dragon-card", {
        // Configure the ScrollTrigger plugin for this animation
        scrollTrigger: {
            trigger: "#gallery", // The section (with ID "gallery") that triggers the animation
            start: "5% top", // Start the animation when the top of the "#gallery" section enters the viewport, with 5% delay.
            end: "bottom", // End the animation when the bottom of the "#gallery" section leaves the viewport
            toggleActions: "restart none none restart",
            // "restart": Restart the animation when entering the section
            // "none": Do nothing when leaving the section
            // "none": Do nothing when re-entering the section
            // "restart": Restart the animation when scrolling back into the section
            // markers: true, // Display visual markers in the browser for debugging the start and end points
        },

        // Animation properties for the "dragon-card" elements
        opacity: 0, // Start with the elements fully transparent
        y: 50, // Start with the elements 50px below their original position
        duration: 2, // Each card animation lasts 2 seconds
        stagger: 0.4, // Add a 0.4-second delay between the animations of each card
    });

});
