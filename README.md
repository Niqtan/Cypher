# Cypher

![alt text](image.png)

## Demonstration
https://youtu.be/v4xISBDn3yg

## Project Aims

### "Finally I don't have to waste 10 extra seconds going to AI to explain this to me like I'm 5"

Cypher is a webpage summarizer for the Chrome. Personally, I have been using a lot to self study so I made this QOL tool in order to reduce that amount of time. By being able to summarize blogs, news, and random pieces of information on the internet in a shorter amount of time, studying could be much more efficient now.

Before you say this is a ChatGPT wrapper, guess what... I added a feature, the ability to save the summaries in a markdown file. This feature is incredibly helpful for me because I use Obsidian a lot for my notes, and just being able to save these summaries really save my time a lot taking notes.

![alt text](image-1.png)

Unfortunately, this still doesn't include a summarizer for PDFs

## Contents of the Project

In my proposed system, the frontend is called via clicking the chrome extension popup and then the user is presented with a UI.

## How does it work?

### Summarize Button
When the user clicks on the summarize button, the system grabs the details of the webpage, including its contents, title, and url. Afterwards, it is then sent to the backend server which contains a Groq API hosted on Vercel. Finally, Groq summarizes the webpage's contents and it is sent to the frontend to be read by the user. 

### Export to Markdown
After finalizing the summary, the user can choose whether to export the summary into a formatted markdown file or not by using the Chrome API. 

## Installation

### To use this extension locally (sorry I'm broke for the chrome developer web store):

```
Unzip the folder
```

Make sure you are in the relative directory of the folder

```
cd \Cypher\
```

```
npm install
```

```
npm run build
```

Open Chrome and go to:

```
chrome://extensions/
```

Enable developer mode and click load unpacked. Afterwards, select the dist/ folder.

Done! You may start using the extension now.

## Project Status
The project is currently complete. I will try to add more features if I need them. However, in the current state, I am content with how this has turned out, and I believe this will help me a lot in the future.

## Support

For questions, suggestions, or collaborations, feel free to contact the engineeer:

Niq Suguitan

- Github: @Niqtan

- Slack User: @Niq

- Email: niqban123@gmail.com

Thank you for checking out Cypher!