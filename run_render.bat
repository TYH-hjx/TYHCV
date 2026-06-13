@echo off
cd /d "D:\APP\AI\???\????\portfolio-react"
python gen_scifi.py > render_log.txt 2>&1
echo DONE >> render_log.txt
