
from PIL import Image, ImageFilter
import numpy as np
import time
import pickle

# These functions return the centroids, they compute k-means
# -----------------------------------------------------------------------------------------

def initialize_centroids(points, k):
    centroids = points.copy().reshape(-1, 3)
    np.random.shuffle(centroids)
    return centroids[:k]

def redmean_distance(points, centroid):
    red = points[:,0]
    green = points[:,1]
    blue = points[:,2]
    dR = red - centroid[0]
    dG = green - centroid[1]
    dB = blue - centroid[2]
    dr = 0.5 * (red + centroid[0])
    dc = (2 + dr/256) * np.square(dR) + 4 * np.square(dG) + (2 + (255-dr)/256) * np.square(dB) 
    return dc

def redmean_closest_centroid(points, centroids):
    distances = np.asarray([redmean_distance(points, c) for c in centroids])
    return np.argmin(distances, axis=0)

def euclid_closest_centroid(points, centroids):
    distances = np.sqrt(((points - centroids[:, np.newaxis])**2).sum(axis=2))
    return np.argmin(distances, axis=0)

def move_centroids(points, closest, centroids):
    return np.array([points[closest==k].mean(axis=0) for k in range(centroids.shape[0])])

def get_k_colours(pixels, k, distance='euclidean'):
    centroids = initialize_centroids(pixels, k)
    if distance=='euclidean':
        for i in range(20):
            closest = euclid_closest_centroid(pixels, centroids)
            centroids = move_centroids(pixels, closest, centroids)
        return centroids
    elif distance == 'redmean':
        for i in range(20):
            closest = redmean_closest_centroid(pixels, centroids)
            centroids = move_centroids(pixels, closest, centroids)
        return centroids


# -----------------------------------------------------------------------------------------

# def regionise_image(im, num_colours):
#     width, height = im.size
#     pixels = np.array(im).reshape(-1, 3)
#     k_centroids = np.round(get_k_colours(pixels, 7)).astype(int)
#     index_map = closest_centroid(pixels, k_centroids).reshape(height, width)
#     regioned_image = k_centroids[index_map].astype(np.uint8)
#     return Image.fromarray(regioned_image)

def regionise_image(im, num_colours, distance='euclidean'):
    width, height = im.size
    pixels = np.array(im).astype('float32').reshape(width*height, 3)
    k_centroids = np.round(get_k_colours(pixels, num_colours)).astype(int)

    if distance == 'redmean':
        index_map = redmean_closest_centroid(pixels, k_centroids).reshape(height, width)
    else:
        index_map = euclid_closest_centroid(pixels, k_centroids).reshape(height, width)
    return index_map, k_centroids

# TODO: Find some way of doing these functions in numpy?

def getVicInVals(mat, x, y, r):
    width = len(mat[0])
    height = len(mat)
    vicInVals = []
    for xx in range(x-r, x+r+1):
        for yy in range(y-r, y+r+1):
            if (xx >= 0 and xx < width and yy >= 0 and yy < height):
                vicInVals.append(mat[yy][xx])
    return vicInVals

def smooth(mat):
    width = len(mat[0])
    height = len(mat)
    simp = [[0 for _ in range(width)] for _ in range(height)]
    for y in range(height):
        for x in range(width):
            vicInVals = getVicInVals(mat, x, y, 4)
            simp[y][x] = max(set(vicInVals), key=vicInVals.count)
    return simp

def neighboursSame(mat, x, y):
    width = len(mat[0])
    height = len(mat)
    val = mat[y][x]
    xRel = [1, 0]
    yRel = [0, 1]
    for i in range(2):
        xx = x+xRel[i]
        yy = y+yRel[i]
        if (xx >= 0 and xx < width and yy >= 0 and yy < height):
            if mat[yy][xx] != val:
                return False
    return True

def outline(mat):
    width = len(mat[0])
    height = len(mat)
    line = np.array([[[255,255,255] for _ in range(width)] for _ in range(height)])
    for y in range(height):
        for x in range(width):
            if not neighboursSame(mat, x, y):
                line[y][x][0] = 0
                line[y][x][1] = 0
                line[y][x][2] = 0
            
    return line.astype(np.uint8)




# Converts an image into its contours
def convert(num_colours):

    blah = time.time()

    image = Image.open("/Users/Somethingsensible/personal_projects/paintbynumbers/tiger.jpg").convert('RGB')
    image.show()

    # resize image

    mywidth = 2000
    wpercent = (mywidth/float(image.size[0]))
    myheight = int((float(image.size[1])*float(wpercent)))
    resized_image = image.resize((mywidth,myheight), resample=Image.Resampling.HAMMING).filter(ImageFilter.BLUR)

    blah2 = time.time()
    print(f"Time taken to resize image: {blah2-blah}")
    

    # Euclidean-colourise

    index_map, k_centroids = regionise_image(resized_image, num_colours, distance='euclidean')
    index_map = smooth(index_map)
    regioned_image = k_centroids[index_map].astype(np.uint8)
    smoothed_im = Image.fromarray(regioned_image)
    smoothed_im.show()

    blah3 = time.time()
    print(f"Time taken to colour image: {blah3-blah2}")

    smoothed_im.save("/Users/Somethingsensible/personal_projects/paintbynumbers/test_tiger.png", "PNG")

    

    blah4 = time.time()

    with open("/Users/Somethingsensible/personal_projects/paintbynumbers/pixelated_index.pkl", "wb") as file:
        pickle.dump(index_map, file)

    with open("/Users/Somethingsensible/personal_projects/paintbynumbers/pixelated_centroids.pkl", "wb") as file:
        pickle.dump(k_centroids, file)

    # Redmean-colourise

    # index_map, k_centroids = regionise_image(resized_image, num_colours, distance='redmean')
    # index_map = smooth(index_map)
    # regioned_image = k_centroids[index_map].astype(np.uint8)
    # smoothed_im = Image.fromarray(regioned_image)
    # smoothed_im.show(title=str(num_colours))


    # Get outline

    # ol = outline(index_map)
    # outline_image = Image.fromarray(ol)
    # outline_image.show()

def main():
    convert(40)


    # smoothed_im = im.filter(ImageFilter.SMOOTH_MORE)

    # im.show("Original")
    # regionise_image(im, num_colours).show("Original Regionised")
    # regionise_image(smoothed_im, num_colours).show("Smooth Regionised")


# index_map, k_centroids = regionise_image(im, num_colours)
    # index_map = smooth(index_map)

    # regioned_image = k_centroids[index_map].astype(np.uint8)
    # smoothed_im = Image.fromarray(regioned_image)
    # smoothed_im.show(title=str(num_colours))

    # ol = outline(index_map)

    # outline_image = Image.fromarray(ol)
    # outline_image.show()

    
if __name__ == "__main__":
    main()

