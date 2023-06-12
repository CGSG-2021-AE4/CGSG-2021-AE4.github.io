function OnPushClick( Obj )
{
    var ClassName = Obj.className;

    console.log(ClassName);
    if (ClassName.includes(' pushed'))
    Obj.className = ClassName.replace('pushed', '');
    else
    Obj.className += " pushed";
}