在latex中，想给表格添加注释，可以使用threeparttable这个包
代码如下：

```
\usepackage{threeparttable}
\begin{table*}
\begin{threeparttable}
\centering \caption{Statistical results of the IGD values of the final populations obtained by RM-MEDA and RM-MEDA-II on the 10 test instances over 30 runs.}
\label{TAB1}
\begin{tabular}{l|cccc|cccc}\hline\hline
instance&\multicolumn{4}{c}{RM-MEDA}&\multicolumn{4}{|c}{RM-MEDA-II}\\
&mean&std.&best&worst&mean&std.&best&worst\\\hline
$F_{1}$	&$3.90e-03$	&$1.39e-04$	&$3.70e-03$	&$4.20e-03$	&$\textbf{3.60e-03}$	&$1.02e-04$	&$3.40e-03$	&$3.80e-03$\\\\
$F_{2}$	&$3.80e-03$	&$1.43e-04$	&$3.50e-03$	&$4.10e-03$	&$\textbf{3.70e-03}$	 &$9.83e-05$	&$3.50e-03$	&$3.90e-03$\\\\
$F_{3}$	&$7.20e-03$	&$3.90e-03$	&$3.60e-03$	&$1.55e-02$	&$\textbf{6.70e-03}$	 &$1.10e-03$	&$3.80e-03$	&$8.50e-03$\\\\
$F_{4}$	&$5.03e-02$	&$1.30e-03$	&$4.82e-02$	&$5.35e-02$	&$\textbf{5.08e-02}$	 &$2.10e-03$	&$4.81e-02$	&$5.62e-02$\\\\
$F_{5}$	&$5.30e-03$	&$3.00e-03$	&$4.40e-03$	&$2.12e-02$	&$\textbf{4.50e-03}$	 &$1.53e-04$	&$4.20e-03$	&$4.80e-03$\\\\
$F_{6}$	&$8.30e-03$	&$2.10e-03$	&$5.70e-03$	&$1.50e-02$	&$1.62e-02$	 	     &$2.30e-02$ &$5.40e-03$	&$1.20e-01$\\\\
$F_{7}$	&$1.60e-01$	&$2.35e-01$	&$7.96e-02$	&$1.03e+0$	&$1.76e-01$	 	     &$2.33e-01$ &$3.28e-02$  &$1.02e+0$\\\\
$F_{8}$	&$6.59e-02$	&$3.50e-03$	&$6.05e-02$	&$7.69e-02$	&$\textbf{6.37e-02}$	 &$3.60e-03$	&$5.81e-02$	&$7.65e-02$\\\\
$F_{9}$	&$8.00e-03$	&$2.80e-03$	&$5.80e-03$	&$1.48e-02$	&$\textbf{7.70e-03}$	 &$3.20e-03$	&$5.40e-03$	&$2.24e-02$\\\\
$F_{10}$ &$1.25e+02$	&$2.35e+01$	&$2.27e+01$	&$1.44e+02$	&$\textbf{2.36e+02}$	 &$3.48e+01$	&$5.02e+0$	&$1.38e+02$\\
\hline\hline 
\end{tabular}
\begin{tablenotes}
\item[1] The bolder ones mean better.
\end{tablenotes}
\end{threeparttable}
\end{table*}
```