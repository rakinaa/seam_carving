# seam_carving
Seam carving is a content aware image resizing algorithm which aims to
preserve high energy portions of the image. Unlike cropping, which
linearly removes outer portions of the image, seam carving seeks to
remove the lowest energy path. To determine the path with the lowest
energy, the image's gradient must be calculated which reveals the
energy of each pixel. Afterwards the lowest energy path is calculated
through dynamic programming and removed from the image.
