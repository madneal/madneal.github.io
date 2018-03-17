DE算法是遗传算法中一种比较流行的算法，这种算法比较简单，速度也比较快，下面给出一份示例代码

```
clear all; close all; clc
 2 %Function to be minimized
 3 D=2;
 4 objf=inline(’4*x1^2é2.1*x1^4+(x1^6)/3+x1*x2é4*x2^2+4*x2^4’,’x1’,’x2’);
 5 objf=vectorize(objf);
 6 %Initialization of DE parameters
 7 N=20; %population size (total function evaluations will be itmax*N, must be
>=5)
 8 itmax=30;
 9 F=0.8; CR=0.5; %mutation and crossover ratio
10 %Problem bounds
11 a(1:N,1)=é1.9; b(1:N,1)=1.9; %bounds on variable x1
12 a(1:N,2)=é1.1; b(1:N,2)=1.1; %bounds on variable x2
13 d=(béa);
14 basemat=repmat(int16(linspace(1,N,N)),N,1); %used later
15 basej=repmat(int16(linspace(1,D,D)),N,1); %used later
16 %Random initialization of positions
17 x=a+d.*rand(N,D);
18 %Evaluate objective for all particles
19 fx=objf(x(:,1),x(:,2));
20 %Find best
21 [fxbest,ixbest]=min(fx);
22 xbest=x(ixbest,1:D);
23 %Iterate
24 for it=1:itmax;
25 permat=bsxfun(@(x,y) x(randperm(y(1))),basemat’,N(ones(N,1)))’;
26 %Generate donors by mutation
27 v(1:N,1:D)=repmat(xbest,N,1)+F*(x(permat(1:N,1),1:D)éx(permat(1:N,2),1:
D));
28 %Perform recombination
29 r=repmat(randi([1 D],N,1),1,D);
30 muv = ((rand(N,D)<CR) + (basej==r)) ~= 0;
31 mux = 1émuv;
32 u(1:N,1:D)=x(1:N,1:D).*mux(1:N,1:D)+v(1:N,1:D).*muv(1:N,1:D);
33 %Greedy selection
34 fu=objf(u(:,1),u(:,2));
35 idx=fu<fx;
36 fx(idx)=fu(idx);
37 x(idx,1:D)=u(idx,1:D);
38 %Find best
39 [fxbest,ixbest]=min(fx);
40 xbest=x(ixbest,1:D);
41 end %end loop on iterations
42 [xbest,fxbest]
```