import javax.swing.JFrame;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.GridLayout;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JPanel;
import javax.swing.JLabel;

/*
@author Joseph McGillen
**/

public class MemoryGame extends JFrame {
    private JButton[] buttons;
    private JLabel statsLabel;
    private boolean gameOver;
    //String Idea was from GitHub memory game but wasn't copy and pasted
    private String[] c = {"cat","dog","duck","frog","lizard","bird","fish","monkey",
                    "monkey","fish","cat","bird","frog","lizard","dog","duck"}; 
    private int fill;
    private int count;
    
    public MemoryGame(){
        super("MemoryGame"); 
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        add(makeMainPanel());
        pack();
        setVisible(true);
        gameOver = false;
        playRound();
    }

    private JPanel makeMainPanel() {
        buttons = new JButton[16];
        JPanel buttonPanel = new JPanel(new GridLayout(4, 4));
        buttonPanel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        Listener listener = new Listener();

        for(int i = 0; i < 16; i++){
                buttons[i] = new JButton("?");
                buttons[i].setPreferredSize(new Dimension(100, 100));
                buttonPanel.add(buttons[i]);
                buttons[i].addActionListener(listener);
        }
        
        statsLabel = new JLabel("MemoryGame");
        JPanel statsPanel = new JPanel();
        statsPanel.add(statsLabel);
        statsPanel.setBorder(BorderFactory.createEmptyBorder(0, 0, 10, 0));

        JPanel mainPanel = new JPanel(new BorderLayout());
        mainPanel.add(buttonPanel, BorderLayout.CENTER);
        mainPanel.add(statsPanel, BorderLayout.SOUTH);

        return mainPanel;

    }

    private class Listener implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent event) { //When we click on buttons that don't match count doesn't reset
            if (!gameOver){
                for (int i = 0; i < 16; i++){
                    if(event.getSource() == buttons[i]){
                        buttons[i].setText(c[i]);
                        
                        if(c[i] == c[fill]){
                            buttons[i].setEnabled(false);
                            buttons[fill].setEnabled(false);
                            count = 0;
                            fill = 0;
                        } else if(count == 2){

                            if (c[i] != c[fill]){
                            buttons[i].setText("?");
                            buttons[fill].setText("?"); 
                            count = 0; 
                            }
                        }
                        
                        fill = i;
                        count ++;                     
                    }
                }
                playRound();
            }        
        }
    }

    private int checkWin(){
        int match = 0;
        int s = 0;
        int e = 0;
        int r = 0;
        int h = 0;
        int d = 0;
        int l = 0;
        int a = 0;
        int t = 0;
        
        for (int i = 0; i < 16; i++){
            if (buttons[i].getText().equals("cat")) s++;
            else if (buttons[i].getText().equals("dog")) e++;
            else if (buttons[i].getText().equals("duck"))r++;
            else if (buttons[i].getText().equals("frog"))h++;
            else if (buttons[i].getText().equals("lizard"))d++;
            else if (buttons[i].getText().equals("bird"))l++;
            else if (buttons[i].getText().equals("fish"))a++;
            else if (buttons[i].getText().equals("monkey"))t++;          
    
        }
        
        if (s == 2) match++;
        if (e == 2) match++;
        if (r == 2) match++;
        if (h == 2) match++;
        if (d == 2) match++;
        if (l == 2) match++;
        if (a == 2) match++;
        if (t == 2) match++;
        
        return match;  
        
                             
    }
    
    private void playRound() {
        int p = checkWin();

        if (p == 0){
            statsLabel.setText("Find the matches");
            gameOver = false;
        } else if (p == 8){
            statsLabel.setText("Found all matches");
            gameOver = true;
        }
    }


    public static void main(String[] args){
        new MemoryGame();
    }
}


