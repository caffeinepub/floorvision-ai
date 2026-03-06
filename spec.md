# FloorVision AI

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Home page (`/`) with:
  - Hero section: headline, subheadline, CTA button
  - Image upload section below hero for uploading a 2D floor plan (dummy, no real upload processing)
- Visualizer page (`/visualizer`) with:
  - Section 1: Side-by-side view of original 2D floor plan and AI-generated 3D colorful render (dummy images)
  - Section 2: Image comparison slider between original and generated image
  - Section 3: Text input field for requesting changes to the generated image (dummy, no submission)
  - Section 4: Multi-angle 3D view gallery showing multiple perspective views of the floor plan (dummy images)
  - Section 5: AI video generation section for interior showcase (dummy UI, no real video)
- Navigation bar linking Home and Visualizer
- Premium light theme, sleek and minimal design throughout

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan
1. Generate all required visual assets: hero background, sample 2D floor plan image, sample 3D render images, multi-angle view thumbnails
2. Set up React Router with two routes: `/` and `/visualizer`
3. Build shared Navbar component
4. Build Home page: hero with headline/CTA, upload dropzone section
5. Build Visualizer page with 5 sections as described above
6. Use dummy static data and images throughout -- no real API calls
7. Apply premium light theme with unique, high-end visual design
