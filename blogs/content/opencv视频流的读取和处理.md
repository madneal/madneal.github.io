 1. Opencv提供一个简单易用的框架以提取视频文件和USB摄像头中的图像帧，如果只是想读取某个视频，你只需要创建一个VideoCapture实例，然后在循环中提取每一帧。下面是一个简单的代码

```
#include<opencv2\core\core.hpp>
#include<opencv2\imgproc\imgproc.hpp>
#include<opencv2\highgui\highgui.hpp>
#include<iostream>
using namespace cv;
using namespace std;

int main()
{
	VideoCapture capture("d:\\road.avi");
	//检测视频是否读取成功
	if (!capture.isOpened())
	{
		cout << "No input image";
		return 1;
	}

	//获取图像帧率
	double rate = capture.get(CV_CAP_PROP_FPS);
	bool stop = false;
	Mat frame;
	namedWindow("Example");

	int delay = 1000/rate;

	while (!stop)
	{
		if (!capture.read(frame))
			break;
		imshow("Example",frame);
		if (waitKey(delay) >= 0)
			stop = true;
	}
	return 0;
}

```
要正确地打开视频文件必须确保电脑具有相应的解码器。同时也应该注意文件路径的未知是否正确，路径为止错误经常也会提示错误warning: Error opening file (../../modules/highgui/src/cap_ffmpeg_impl.hpp:545)。这个错误一般都是文件路径错误而导致的。

 2. 处理视频帧
 为了对视频中的每一帧进行处理，我们可以创建自己的类VideoProcessor,其中封装OopenCV的视频获取框架，该类允许我们制定每帧调用的处理函数。
 首先，我们希望制定一个回调处理函数，（关于回调函数，另外一个帖子http://blog.csdn.net/neal1991/article/details/45009377有介绍）。这个喊出可以接受一个Mat对象然后输出处理之后的Mat对象。

```
void processFrame(Mat& img, Mat& out);


    // 对视频的每帧做Canny算子边缘检测
void canny(Mat& img, Mat& out) 
{
    // 先要把每帧图像转化为灰度图
   cvtColor(img,out,CV_BGR2GRAY);
    // 调用Canny函数
   Canny(out,out,100,200);
    // 对像素进行翻转
    threshold(out,out,128,255,THRESH_BINARY_INV);
}
```

定义好一个视频处理类，它将与一个回调函数相关联。使用该类，可以创建一个实例，制定输入的视频文件，绑定回调函数，然后开始对每一帧进行处理，要调用这个视频处理类，只需要在main函数添加就可以了：

```
	// 首先创建实例
    VideoProcessor processor;
    // 打开视频文件
    processor.setInput("e:\\road.avi");
    
    // 分别为输入和输出视频
    processor.displayInput("Input Video");
    processor.displayOutput("Output Video");
    // 以原始帧率播放视频
    processor.setDelay(1000./processor.getFrameRate());
    // 设置处理回调函数
    processor.setFrameProcessor(canny);
    // 开始帧处理过程
    processor.run();
    waitKey();
```