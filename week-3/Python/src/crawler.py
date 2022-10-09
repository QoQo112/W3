from distutils.filelist import findall
from email import header
import urllib.request as rq
import bs4 
# variables declaration
result = ""
positive = ""
normal = ""
negative = ""
# web crawling 
url = "https://www.ptt.cc/bbs/movie/index.html"
for i in range(0, 10):
    request = rq.Request(url, headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"
    })
    with rq.urlopen(request) as response:
        data = response.read().decode("utf-8")
    root = bs4.BeautifulSoup(data, "html.parser")
    titles = root.find_all("div", class_= "title")
    for title in titles:
        if title.a != None:
            if title.a.string[0:4] == "[好雷]" :
                positive += (title.a.string)+"\n"
            elif title.a.string[0:4] == "[普雷]":    
                normal += (title.a.string)+"\n"
            elif title.a.string[0:4] == "[負雷]":
                negative += (title.a.string)+"\n"
    next_page = root.find("a", string = "‹ 上頁")
    next_page_link = next_page["href"]
    url = "https://www.ptt.cc" + next_page_link
# data processing
result += positive + normal + negative
with open("movie.txt", "w", encoding="utf-8-sig") as file:
        file.write(result)
