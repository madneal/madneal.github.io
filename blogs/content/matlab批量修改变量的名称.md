使用matlab做实验的时候，保存的文件里面的变量名都是一样的 ，所以希望能够把变量名全部都重命名。我举个个例子，假设我一堆文件，文件名分别是gds1,gds2,gds2,..... 但是实际上load进来之后的变量名称都是gds，所以我希望能够把变量名能够改成相对应的文件名称。在这里，我使用了eval这个函数，这个函数到是一个非常方便的选择。
`%% 变量批量重命名
clear all
rootname = 'gds';
extension = '.mat';
for i = 1:n
    variable = [rootname,int2str(i)];
    filename = [variable,extension];
    load(filename);
    eval(['gds',num2str(i),'=','gds',';']);
    save(filename,variable);
    clear gds variable filename;
end
clear all`