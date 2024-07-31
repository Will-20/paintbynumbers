from PIL import Image, ImageFilter, ImageFont, ImageDraw
import numpy as np
import time
from skimage.filters.rank import majority
from skimage.morphology import square
import pickle

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
                line[y][x][0] = 200
                line[y][x][1] = 200
                line[y][x][2] = 200
            
    return line.astype(np.uint8)

def get_position(r, c, mat):
    height, width = mat.shape[0], mat.shape[1]
    colour = mat[c][r]
    i = 0
    while r+i < width and mat[c][r+i] == colour:
        i += 1
    j = 0
    while c+j < height and mat[c+j][r] == colour:
        j += 1
    k = 0
    while r+k < width and c+k < height and mat[c+k][r+k] == colour:
        k += 1

    if i > j and i > k:
        return (r + (i // 2), c)
    elif j > i and j > k:
        return (r, c + (j // 2))
    else:
        return (r + (k // 2), c + (k // 2))


def get_regions(mat):
    height, width = mat.shape[0], mat.shape[1]

    regions = np.zeros(mat.shape, dtype=int)
    discovered = np.full(mat.shape, False)
    
    def dfs(r, c, region):
        stack = [(r, c)]
        colour = mat[c][r]
        while stack != []:
            row, col = stack.pop()
            if row >= 0 and row < width and col >= 0 and col < height:
                if mat[col][row] == colour:
                    if not discovered[col][row]:
                        regions[col][row] = region
                        discovered[col][row] = True
                        stack.append((row+1, col))
                        stack.append((row-1, col))
                        stack.append((row, col+1))
                        stack.append((row, col-1))

    number_positions = []

    region = 0
    for r in range(width):
        for c in range(height):
            if not discovered[c][r]:
                dfs(r, c, region)
                number_positions.append((get_position(r, c, mat), mat[c][r]))
                region += 1

    return regions, number_positions

import random

def generate_color(): 
  # Generate random values for red, green, and blue 
  r = random.randint(0, 255) 
  g = random.randint(0, 255) 
  b = random.randint(0, 255) 
 
  
  return [r, g, b] 

def draw_point(mat, i, j, colour):
    mat[i][j][0] = colour[0]
    mat[i][j][1] = colour[1]
    mat[i][j][2] = colour[2]

def draw_numbers(mat, positions, text_colour):
    digit_map = {
        0: [(-1, -2), (1, -2), (-1, -1), (1, -1), (-1, 0), (+1, 0), (-1, 1), (1, 1), (-1, 2), (1, 2), (0, 2), (0, -2)],
        1: [(0,-2), (0,-1), (0,0), (0,1), (0,2), (-1,-1), (-1, 2), (1, 2)],
        2: [(0, 0), (-1, -2), (1, -2), (1, -1), (-1, 0), (1, 0), (-1, 1), (-1, 2), (1, 2), (0, 2), (0, -2)],
        3: [(0, 0), (-1, -2), (1, -2), (1, -1), (-1, 0), (1, 0), (1, 1), (-1, 2), (1, 2), (0, 2), (0, -2)],
        4: [(1, -2), (1, -1), (1, 0), (1, 1), (1, 2), (0, 0), (-1, 0), (-1, -1), (-1, -2)],
        5: [(-1, -2), (1, -2), (-1, -1), (-1, 0), (1, 0), (1, 1), (-1, 2), (1, 2), (0, 2), (0, -2), (0, 0)],
        6: [(-1, -2), (1, -2), (-1, -1), (-1, 0), (1, 0), (1, 1), (-1, 2), (1, 2), (0, 2), (0, -2), (0, 0), (-1, 1)],
        7: [(1, -2), (1, -1), (1, 0), (1, 1), (1, 2), (0, -2), (-1, -2)],
        8: [(-1, -2), (1, -2), (-1, -1), (1, -1), (-1, 0), (1, 0), (-1, 1), (1, 1), (-1, 2), (1, 2), (0, 2), (0, -2), (0, 0)],
        9: [(-1, -2), (1, -2), (-1, -1), (1, -1), (-1, 0), (1, 0), (1, 1), (1, 2), (0, -2), (0, 0)]
    }

    left = 10
    top = 10

    for pair in positions:
        pos, colour = pair
        pos = (left+pos[1], top+pos[0])

        string = str(colour + 1)
        if len(string) == 1:
            for (j, i) in digit_map[int(string[0])]:
                draw_point(mat, pos[0]+i, pos[1]+j, text_colour)
        if len(string) == 2:
            for (j, i) in digit_map[int(string[0])]:
                draw_point(mat, pos[0]+i, pos[1]+j-2, text_colour)
            for (j, i) in digit_map[int(string[1])]:
                draw_point(mat, pos[0]+i, pos[1]+j+2, text_colour)



def main():
    # image = Image.open("/Users/Somethingsensible/personal_projects/paintbynumbers/pixelated.png").convert('RGB')
    # draw = ImageDraw.Draw(image)
    # font = ImageFont.load_default()
    # draw.text((0, 0),"5",(50,50,50),font=font)
    # image.show()

    with open("/Users/Somethingsensible/personal_projects/paintbynumbers/pixelated_index.pkl", "rb") as file:
        index_map = pickle.load(file)

    with open("/Users/Somethingsensible/personal_projects/paintbynumbers/pixelated_centroids.pkl", "rb") as file:
        k_centroids = pickle.load(file)


    index_map = np.array(index_map)

    
    # blah = k_centroids[index_map].astype(np.uint8)
    # blah_im = Image.fromarray(blah)
    # blah_im.show()

    # outline_im = outline(index_map)
    # outline_image = Image.fromarray(outline_im)
    # outline_image.show()

    for _ in range(5):
        for _ in range(5):
            index_map = majority(index_map, square(3))
        index_map = majority(index_map, square(5))

    blah = k_centroids[index_map].astype(np.uint8)
    blah_im = Image.fromarray(blah)
    blah_im.show()

    outline_im = outline(index_map)
    outline_image = Image.fromarray(outline_im)

    padded_outline = np.pad(outline_im, ((10, 10), (10,10), (0,0)))

    mat, positions = get_regions(index_map)

    draw_numbers(padded_outline, positions, (0, 0, 0))
    outline_with_numbers_image = Image.fromarray(padded_outline)
    outline_with_numbers_image.show()

    # right = 10
    # left = 10
    # top = 10
    # bottom = 10
    # width, height = outline_image.size 
    # new_width = width + right + left 
    # new_height = height + top + bottom 
    
    # result = Image.new(outline_image.mode, (new_width, new_height), (255, 255, 255)) 
    # result.paste(outline_image, (left, top)) 

    # draw = ImageDraw.Draw(result)
    # draw.fontmode = "1"
    # font = ImageFont.load_default(size=10)

    # for pair in positions:
    #     pos, colour = pair
    #     pos = (left + pos[0], top + pos[1])
    #     draw.text(pos,str(colour+1),(0,0,0),font=font,anchor="mm")
    # result.show()


    # colours = np.array([generate_color() for _ in range(10000)])
    # regioned_image = colours[mat].astype(np.uint8)
    # img = Image.fromarray(regioned_image)
    # img.show()

    
    

    # width, height = image.size
    # print(width, height)


if __name__ == "__main__":
    main()