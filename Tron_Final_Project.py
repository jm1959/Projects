# tron_final_project.py 
# Mitch DiFante and Joseph McGillian

from turtle import *

FRAMES_PER_SECOND = 10

# setup turtle screen
stage = Screen()
stage.bgcolor("Black")          # } Our own Creation 
stage.title("Welcome to Tron")

# setup game area
border = Turtle()
border.color("white")
border.penup()
border.setposition(-250, -250)
border.pendown()                 # } Credit to: Centre for Computing History
border.pensize(3)
for i in range(4):
    border.forward(500)
    border.left(90)
border.hideturtle()
    
def turnRight1():
    global player1
                              # } Used circle_game.py for reference
    player1.right(90)
    
def turnRight2():
    global player2
                              # } Our own creation
    player2.right(90)   
        
def turnLeft1():
    global player1
                              # } Used circle_game.py for reference
    player1.left(90)
    

def turnLeft2():
    global player2
                              # } Our own creation
    player2.left(90)


def move():
    global player1
    global player2
                              # } Our own creation
    if moving:
        player1.forward(20)
        player2.forward(20)
        

        ontimer(move, 100000 // FRAMES_PER_SECOND)

def start1():
    global moving
                              # } Used circle_game.py as reference
    moving = True
    move()
    
def start2():
    global moving
                              # } Our own creation
    moving = True
    move()

def stop1():
    global moving
                             # } Used circle_game.py as reference
    moving = False

def stop2():
    global moving
                             # } Our own creation
    moving = False

def endGame1():
    global pen
    setposition(-125, -125)
    color("Orange")                                        # } Our own creation
    write("Player 2 Wins!", font = ("Impact", 35, "bold"))
    hideturtle()

def endGame2():
    global pen
    setposition(-125, -125)
    color("Blue")                                          # } Our own creation
    write("Player 1 Wins!", font = ("Impact", 35, "bold"))
    hideturtle()

def main():
    global player1
    global player2
    global pen

    player1 = Turtle()
    player1.color("Blue")
    player1.hideturtle()                    
    player1.penup()
    player1.goto(0, 0)
    player1.pendown()
    player1.showturtle()


    player2 = Turtle()
    player2.color("Orange")
    player2.hideturtle()
    player2.penup()                  # } Our own creation
    player2.goto(0, -220)
    player2.pendown()
    player2.showturtle()


    pen = Turtle()
    pen.penup()
    pen.color("White")
    pen.hideturtle()
    


    onkey(turnRight1, "Right")
    onkey(turnLeft1, "Left")
    onkey(start1, "Up")
    onkey(stop1, "Down")
    listen()

    onkey(turnRight2, "d")
    onkey(turnLeft2, "a")
    onkey(start2, "w")
    onkey(stop2, "s")
    listen()

    positions = []

    while True:
        player1.forward(20)
        player2.forward(20)
        
        if player1.xcor() > 240 or player1.xcor() < -240:
            endGame1()
            break;

        if player1.ycor() > 240 or player1.ycor() < -240:
            endGame1()
            break;

        if player2.xcor() > 240 or player2.xcor() < -240:   # } Credit to: Centre of Computing History
            endGame2()
            break;                                           


        if player2.ycor() > 240 or player2.ycor() < -240:
            endGame2()
            break;

        position1 = (player1.xcor(), player1.ycor())
        position2 = (player2.xcor(), player2.ycor())

        if position1 in positions:
            endGame1()
            break;

        if position2 in positions:
            endGame2()
            break;

        else:
            positions.append(position1)
            positions.append(position2)
    

main()
