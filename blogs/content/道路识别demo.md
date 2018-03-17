最近做的道路识别一开始终于弄懂了点东西，一开始在网上找到了一个简单的道路识别的opencvsharp的版本。我觉得opencvsharp真的是一个很好的东西，它封装了比opencv更多的数据结构和库，而且得益于.net平台的强大，使用起来也非常的便捷。唯一的缺点就是目前关于这方面的资料还是少之又少，后来我还是想一想把这个demo转换成cpp版本，也是一个非常简单的demo。
## opencvsharp版本 ##

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;

using OpenCvSharp;

namespace LaneDetection
{
    class Program
    {
        [STAThread]
        static void Main()
        {
            CvCapture cap = CvCapture.FromFile("test1.mp4");
            CvWindow w = new CvWindow("Lane Detection");
            CvWindow canny = new CvWindow("Canny");
            IplImage src, gray, dstCanny, halfFrame, smallImg;
            CvMemStorage storage = new CvMemStorage();
            CvSeq lines;

            while (CvWindow.WaitKey(10) < 0)
            {
                src = cap.QueryFrame();
                halfFrame = new IplImage(new CvSize(src.Size.Width / 2, src.Size.Height / 2), BitDepth.U8, 3);
                Cv.PyrDown(src, halfFrame, CvFilter.Gaussian5x5);

                gray = new IplImage(src.Size, BitDepth.U8, 1);
                dstCanny = new IplImage(src.Size, BitDepth.U8, 1);
                storage.Clear();
                
                // Crop off top half of image since we're only interested in the lower portion of the video
                int halfWidth = src.Width / 2;
                int halfHeight = src.Height / 2;
                int startX = halfWidth - (halfWidth / 2);
                src.SetROI(new CvRect(0, halfHeight - 0, src.Width - 1, src.Height - 1));

                gray.SetROI(src.GetROI());
                dstCanny.SetROI(src.GetROI());

                src.CvtColor(gray, ColorConversion.BgrToGray);
                Cv.Smooth(gray, gray, SmoothType.Gaussian, 5, 5);
                Cv.Canny(gray, dstCanny, 50, 200, ApertureSize.Size3);
                canny.Image = dstCanny;
                storage.Clear();
                lines = dstCanny.HoughLines2(storage, HoughLinesMethod.Probabilistic, 1, Math.PI / 180, 50, 50, 100);

                for (int i = 0; i < lines.Total; i++)
                {
                    CvLineSegmentPoint elem = lines.GetSeqElem<CvLineSegmentPoint>(i).Value;
                    
                    int dx = elem.P2.X - elem.P1.X;
                    int dy = elem.P2.Y - elem.P1.Y;
                    double angle = Math.Atan2(dy, dx) * 180 / Math.PI;

                    if (Math.Abs(angle) <= 10)
                        continue;

                    if (elem.P1.Y > elem.P2.Y + 50  || elem.P1.Y < elem.P2.Y -50 )
                    {
                        src.Line(elem.P1, elem.P2, CvColor.Red, 2, LineType.AntiAlias, 0);
                    }
                }
                src.ResetROI();
                storage.Clear();
                w.Image = src;
            }
        }
    }
}

```

## opencv版本 ##

```
#include "stdafx.h"
#include <highgui.h>
#include <cv.h>
#include <math.h>

using namespace cv;
using namespace std;

#define INF 99999999
CvCapture* g_capture = NULL;

int g_slider_pos = 0 ;
int frame_count = 0;
CvSeq* lines;


int main(int argc,char* argv[])
{                  
    cvNamedWindow( "show");      
	g_capture=cvCreateFileCapture( "D:\\road.avi");
    IplImage* frame;
    while(1)
    {  
		CvMemStorage* storage = cvCreateMemStorage();
		frame=cvQueryFrame(g_capture);

		//set the ROI of the original image
		int x = 0,y = frame->height/2;
		int width = frame->width,height = frame->height/2;

		if(!frame) 
			break; 

		cvSetImageROI(frame,cvRect(x,y,width,height));
		IplImage* gray = cvCreateImage(cvGetSize(frame),8,1);
		cvCvtColor(frame,gray,CV_BGR2GRAY);

		cvCanny(gray,gray,50,100);
		cvShowImage("canny",gray);
		cvSmooth(gray,gray,CV_GAUSSIAN,3,1,0);

		//Hough
		lines = cvHoughLines2(gray,storage,CV_HOUGH_PROBABILISTIC,1,CV_PI/180,50,90,50);

		//select approprivate lines acoording to the slope
		for (int i = 0;i < lines->total;i ++)
		{
			double k =INF;
			CvPoint* line = (CvPoint*)cvGetSeqElem(lines,i);
			int dx = line[1].x - line[0].x;
			int dy = line[1].x - line[0].y;
			double angle = atan2(dy,dx) * 180 /CV_PI;
			if (abs(angle) <= 10)
				continue;
			if (line[0].y > line[1].y + 50 || line[0].y < line[1].y - 50)
			{
				cvLine(frame,line[0],line[1],CV_RGB(255,0,0),2,CV_AA);
			}
		}
		cvResetImageROI(frame);		
		cvShowImage( "show",frame);
        char c = cvWaitKey(33);            
        if(c==27)
            break;
    } 
	cvReleaseCapture(&g_capture);
	cvDestroyWindow( "show");               
    return 0;
}
```
非常希望有弄这方面的人能和我讨论一下，若转载请注明出处，谢谢。