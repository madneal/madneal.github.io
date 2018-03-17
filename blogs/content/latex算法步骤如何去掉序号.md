想去掉latex算法步骤前面的序号，如下
![这里写图片描述](http://img.blog.csdn.net/20151106185801079)
我想去掉每个算法步骤前面的数字序号，1，2，3，因为我已经写了step。我们只需要引用a lgorithmic这个包就可以了，代码如下：

```
\usepackage{algorithmic}
\begin{algorithm}[htb]
\caption{SDE}
\label{alg2}
\begin{algorithmic}
\STATE Step 1. Compute the covariance matrix $C$ of the current population, then apply Eigen decomposition to $C$ as follows:
\begin{equation}
\label{eve}
C=EDE^T
\end{equation}
where $E$ is the eigenvector matrix of the population, $E^T$ is the corresponding transposed matrix. $D$ is a diagonal matrix composed of eigenvalues.

\STATE Step 2. Compute the the projection of the population with eigenvector matrix $E$.
\begin{equation}
\label{proj}
P=X_G\cdot{E} 
\end{equation}

\STATE Step 3. Operate the mutation in Eigen coordinate sysytem.
\begin{equation}
\label{mut}
P'=P_{r_1}+F\cdot(P_{r_2}-P_{r_3})
\end{equation}
where $P_{r_1}$, $P_{r_2}$ and $P_{r_3}$ are sampled randomly from the projection $P$, $P'$ is the projection of mutation vector.

\STATE Step 4. Transform $P'$ to original coordinate system to obtain next generation of population $X_{G+1}$.
\begin{equation}\label{org}
  X_{G+1}=P'\cdot{E^T}
\end{equation}

\end{algorithmic}
\end{algorithm}
```
ok,搞定